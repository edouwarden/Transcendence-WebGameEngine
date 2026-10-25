package user

import (
	"backend/ent"
	"backend/internal/pkg"
	"backend/internal/pkg/picture"
	"context"
	"io"
	"log"
	"path"

	"github.com/danielgtaylor/huma/v2"
)

type UploadProfilePictureIn struct {
	RawBody huma.MultipartFormFiles[struct {
		File huma.FormFile `form:"file" required:"true"`
	}]
}

func (us *UserService) UploadProfilePicture(
	ctx context.Context,
	input *UploadProfilePictureIn,
) (
	*struct{},
	error,
) {
	id, err := pkg.ContextUserID(ctx)
	if err != nil {
		return nil, huma.Error401Unauthorized("Please login again")
	}
	data := input.RawBody.Data()
	contentType := data.File.ContentType
	raw, err := io.ReadAll(data.File)
	if err != nil {
		return nil, huma.Error400BadRequest("No file content")
	}
	file, err := picture.SaveImage(contentType, picture.ImageDir, raw)
	if err != nil {
		return nil, err
	}
	user, err := us.Client.User.Get(ctx, id)
	if err != nil {
		_ = picture.DeleteImage(file, picture.ImageDir)
		return nil, huma.Error500InternalServerError("Try again later")
	}
	oldfile := user.PpPath
	if us.Client.User.UpdateOneID(id).SetPpPath(file).Exec(ctx) != nil {
		_ = picture.DeleteImage(file, picture.ImageDir)
		return nil, huma.Error500InternalServerError("Try again later")
	}
	_ = picture.DeleteImage(oldfile, picture.ImageDir)
	return nil, nil
}

type GetPPIn struct {
	UserID int `path:"id"`
}

type GetPPOut struct {
	ContentType string `header:"Content-Type"`
	Body        []byte
}

func (us *UserService) GetPicture(
	ctx context.Context,
	input *GetPPIn,
) (
	*GetPPOut,
	error,
) {
	out := &GetPPOut{}
	id := input.UserID
	user, err := us.Client.User.Get(ctx, id)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, huma.Error404NotFound("User not found")
		}
		return nil, huma.Error500InternalServerError("Try again later")
	}
	if user.PpPath == "" {
		return nil, huma.Error404NotFound("No profile picture") // TODO: Default profile picture
	}
	out.Body, err = picture.GetImage(user.PpPath, picture.ImageDir)
	contentType, ok := picture.MIMETypes[path.Ext(user.PpPath)]
	if ok == false {
		log.Println("How did we get there")
		return nil, huma.Error500InternalServerError("Very weird error happened")
	}
	out.ContentType = contentType
	return out, nil
}

func (us *UserService) GetMyPicture(
	ctx context.Context,
	input *struct{},
) (
	*GetPPOut,
	error,
) {
	id, err := pkg.ContextUserID(ctx)
	if err != nil {
		return nil, huma.Error401Unauthorized("login")
	}
	return us.GetPicture(ctx, &GetPPIn{UserID: id})
}
