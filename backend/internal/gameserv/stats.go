package gameserv

import (
	"backend/internal/pkg/humaext"
	"context"
)

type PlayerStat struct {
	Wins         int     `json:"wins"`
	TotalGames   int     `json:"games_played"`
	TotalKills   int     `json:"total_kills"`
	TotalDeath   int     `json:"total_deaths"`
	KillPerDeath float64 `json:"avg_kill_per_death"`
	KillPerGame  float64 `json:"avg_kill_per_game"`
	DeathPerGame float64 `json:"avg_death_per_game"`
	AverageRank  float64 `json:"avg_rank"`
}

type GetStatOut struct {
	Body struct {
		UserID   int        `json:"user_id"`
		UserName string     `json:"username"`
		Stats    PlayerStat `json:"stats"`
	}
}

func (gs GameService) GetPlayerStats(
	ctx context.Context,
	input *UserIdPath,
) (
	*GetStatOut,
	error,
) {
	out := &GetStatOut{}
	out.Body.UserID = input.UserID
	user, err := gs.Client.User.Get(ctx, input.UserID)
	if err != nil {
		return nil, humaext.EntErrorToHumaError(err)
	}
	out.Body.UserName = user.Username
	results, err := user.QueryResults().All(ctx)
	if err != nil {
		return nil, humaext.EntErrorToHumaError(err)
	}
	ranksum := 0
	pstat := &out.Body.Stats
	pstat.TotalGames = len(results)
	for _, res := range results {
		pstat.TotalDeath += res.Death
		ranksum += res.Rank
		if res.Rank == 1 {
			pstat.Wins++
		}
		pstat.TotalKills += res.Kills
	}
	if pstat.TotalGames != 0 {
		pstat.DeathPerGame = float64(pstat.TotalDeath) / float64(pstat.TotalGames)
		pstat.AverageRank = float64(ranksum) / float64(pstat.TotalGames)
		pstat.KillPerGame = float64(pstat.TotalKills) / float64(pstat.TotalGames)
	}
	if pstat.TotalDeath != 0 {
		pstat.KillPerDeath = float64(pstat.TotalKills) / float64(pstat.TotalDeath)
	}
	return out, nil
}
