package server

import (
	"context"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
)

type Team struct {
	Members string
}

type TeamInfoInput struct {
}

type TeamInfoOutput struct {
	Body struct {
		Members string `json:"members" example:"Edouard, Shiyan, Alix, Julien"`
		Lead    string `json:"lead" example:"Tristan"`
	}
}

func NewTeam() (team *Team) {
	return &Team{Members: "Edouard, Shiyan, Alix, Julien"}
}

func (team *Team) GetTeamInfo(ctx context.Context, input *TeamInfoInput) (*TeamInfoOutput, error) {
	out := &TeamInfoOutput{}
	out.Body.Members = team.Members
	out.Body.Lead = "Tristan"
	return out, nil
}

func (team *Team) RegisterTeam(api huma.API) {
	huma.Register(api,
		huma.Operation{
			OperationID: "team",
			Method:      http.MethodGet,
			Path:        "/team",
			Summary:     "Team members",
		},
		team.GetTeamInfo,
	)
}
