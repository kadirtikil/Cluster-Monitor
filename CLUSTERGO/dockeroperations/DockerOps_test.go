package dockeroperations_test

import (
	"testing"

	"github.com/kadirtikil/clustermonitor/dockeroperations"
)

/*
not a big test necessary since the only parameter these functions take is the id of the container as a string
the rest is from the api so just checking if the string is handled properly is sufficient.
*/
func TestDockerOps(t *testing.T) {
	tests := []struct {
		name string
		id   string
	}{
		{
			name: "1st: passing in no id",
			id:   "",
		},
		{
			name: "2nd: passing in a not existing id",
			id:   "wobalabadopdop",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if _, err := dockeroperations.RestartContainer(test.id); err == nil {
				t.Errorf("id has not been handler properly")
			}

			if _, err := dockeroperations.KillContainer(test.id); err == nil {
				t.Errorf("id has not been handler properly")
			}

			if _, err := dockeroperations.RemoveContainer(test.id); err == nil {
				t.Errorf("id has not been handler properly")
			}

			if _, err := dockeroperations.PauseContainer(test.id); err == nil {
				t.Errorf("id has not been handler properly")
			}
		})
	}
}
