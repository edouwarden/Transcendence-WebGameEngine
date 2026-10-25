package picture

import (
	"crypto/rand"
	"io"
	"log"
	"os"
	"path"
	"strings"

	"github.com/danielgtaylor/huma/v2"
)

var MIMETypes = map[string]string{
	".jpg":         "image/jpeg",
	".png":         "image/png",
	".gif":         "image/gif",
	".webp":        "image/webp",
	".ico":         "image/x-icon",
	".bmp":         "image/bmp",
	"image/jpeg":   ".jpg",
	"image/jpg":    ".jpg",
	"image/png":    ".png",
	"image/gif":    ".gif",
	"image/webp":   ".webp",
	"image/x-icon": ".ico",
	"image/bmp":    ".bmp",
}

const ImageDir = "/app/img/"

var supported = []string{"jpg", "png", "gif", "webp", "ico", "bmp"}

func isValidContentType(contentType string) (string, bool) {
	ext, ok := MIMETypes[contentType]
	if strings.Contains(contentType, "image/") && ok == true {
		return ext, true
	}
	return "", false
}

func SaveImage(contentType string, dir string, b []byte) (string, error) {
	ext, valid := isValidContentType(contentType)
	if valid == false {
		return "", huma.Error415UnsupportedMediaType("Supported: " + strings.Join(supported, " "))
	}
	filename := rand.Text() + ext
	filePath := path.Join(dir, filename)
	log.Println(filePath)
	file, err := os.OpenFile(filePath, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
		log.Println("Failed to create the file on the disk")
		log.Println("path: ", filePath)
		return "", huma.Error500InternalServerError("Try again later")
	}
	_, err = file.Write(b)
	if err != nil {
		log.Println(err)
		log.Println("Failed to write on a file:", filePath)
		return "", huma.Error500InternalServerError("Try again later")
	}
	return filename, nil
}

func DeleteImage(filename string, dir string) error {
	if filename == "" || filename == "default.jpg" {
		return nil
	}
	err := os.Remove(path.Join(dir, filename))
	return err
}

func GetImage(filename string, dir string) ([]byte, error) {
	file, err := os.Open(path.Join(dir, filename))
	if err != nil {
		return nil, err
	}
	return io.ReadAll(file)
}
