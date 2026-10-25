package user

import (
	"backend/ent"
	"backend/ent/user"
	"context"
	"log"

	// "strconv"

	"github.com/danielgtaylor/huma/v2"
)

type DeleteUserIn struct {
	UserID   int    `query:"user_id"`
	Email    string `query:"email"`
	Username string `query:"username"`
}

type DeleteUserOut struct {
	Message string `json:"message"`
}

func (us *UserService) DeleteUser(ctx context.Context, input *DeleteUserIn) (*DeleteUserOut, error) {
	var err error
	log.Printf("DELETE user_id: %d | email: %s | username: %s\n", input.UserID, input.Email, input.Username)
	if input.UserID != 0 {
		_, err = us.Client.User.
			Delete().Where(user.IDEQ(input.UserID)).Exec(ctx)
	} else if input.Email != "" {
		_, err = us.Client.User.
			Delete().Where(user.EmailEQ(input.Email)).Exec(ctx)
	} else if input.Username != "" {
		_, err = us.Client.User.
			Delete().Where(user.UsernameEQ(input.Username)).Exec(ctx)
	} else {
		return nil, huma.Error400BadRequest("Must provide one of user_id, email or username")
	}
	if err != nil {
		log.Println(err)
		if ent.IsNotFound(err) {
			return nil, huma.Error400BadRequest("user not found")
		}
		return nil, huma.Error500InternalServerError("operation failed")
	}
	return &DeleteUserOut{Message: "user deleted successfully"}, nil
}
