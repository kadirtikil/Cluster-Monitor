package initializers

import (
	"github.com/kadirtikil/clustermonitor/models"
)

func MigrateUser() {
	DB.AutoMigrate(&models.User{})
}
