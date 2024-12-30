package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"log"
	"strings"
)


type ContainerInfo struct {
	ID         string `json:"id"`
	Status     string `json:"status"`
	Image      string `json:"image"`
	Created    string `json:"created"`
	StartedAt  string `json:"startedAt"`
	FinishedAt string `json:"finishedAt"`
	Name       string `json:"name"`
}


type ContainerStats struct {
	CPUUsage    string `json:"cpuUsage"`
	MemoryUsage string `json:"memoryUsage"`
}


type VolumeInfo struct {
	Name       string `json:"name"`
	Driver     string `json:"driver"`
	Mountpoint string `json:"mountpoint"`
	CreatedAt  string `json:"createdAt"`
}


type NetworkInfo struct {
	Name      string `json:"name"`
	ID        string `json:"id"`
	Driver    string `json:"driver"`
	Scope     string `json:"scope"`
	Created   string `json:"created"`
	Subnet    string `json:"subnet"`
	Gateway   string `json:"gateway"`
}


type ImageInfo struct {
	ID         string `json:"id"`
	Repository string `json:"repository"`
	Tag        string `json:"tag"`
	Created    string `json:"created"`
	Size	   string `json:"size"`
}

func setCORSHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}


func getContainerDetails(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	cmd := exec.Command("docker", "ps", "-aq")
	containerIDs, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy: %v", err), http.StatusInternalServerError)
		return
	}

	containers := strings.Fields(string(containerIDs))
	if len(containers) == 0 {
		http.Error(w, "Brak uruchomionych kontenerów.", http.StatusNotFound)
		return
	}

	var containerDetails []ContainerInfo
	for _, containerID := range containers {
		cmd = exec.Command("docker", "inspect", "--format", "{{.Id}},{{.State.Status}},{{.Config.Image}},{{.Created}},{{.State.StartedAt}},{{.State.FinishedAt}},{{.Name}}", containerID)
		output, err := cmd.CombinedOutput()
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy inspect dla kontenera %s: %v", containerID, err), http.StatusInternalServerError)
			return
		}

		parts := strings.Split(string(output), ",")
		if len(parts) == 7 {
			containerDetails = append(containerDetails, ContainerInfo{
				ID:         parts[0],
				Status:     parts[1],
				Image:      parts[2],
				Created:    parts[3],
				StartedAt:  parts[4],
				FinishedAt: parts[5],
				Name:       parts[6],
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	prettyJSON, err := json.MarshalIndent(containerDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(prettyJSON)
}


func getVolumeDetails(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	cmd := exec.Command("docker", "volume", "ls", "-q")
	volumeIDs, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy: %v", err), http.StatusInternalServerError)
		return
	}

	volumes := strings.Fields(string(volumeIDs))
	if len(volumes) == 0 {
		http.Error(w, "Brak wolumenów.", http.StatusNotFound)
		return
	}

	var volumeDetails []VolumeInfo
	for _, volumeName := range volumes {
		cmd = exec.Command("docker", "volume", "inspect", volumeName)
		output, err := cmd.CombinedOutput()
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy inspect dla wolumenu %s: %v", volumeName, err), http.StatusInternalServerError)
			return
		}

		var volumeInfo []map[string]interface{}
		err = json.Unmarshal(output, &volumeInfo)
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas parsowania JSON dla wolumenu %s: %v", volumeName, err), http.StatusInternalServerError)
			return
		}

		if len(volumeInfo) > 0 {
			volumeDetails = append(volumeDetails, VolumeInfo{
				Name:       volumeInfo[0]["Name"].(string),
				Driver:     volumeInfo[0]["Driver"].(string),
				Mountpoint: volumeInfo[0]["Mountpoint"].(string),
				CreatedAt:  volumeInfo[0]["CreatedAt"].(string),
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	prettyJSON, err := json.MarshalIndent(volumeDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(prettyJSON)
}


func getNetworkDetails(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	cmd := exec.Command("docker", "network", "ls", "-q")
	networkIDs, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy: %v", err), http.StatusInternalServerError)
		return
	}

	networks := strings.Fields(string(networkIDs))
	if len(networks) == 0 {
		http.Error(w, "Brak sieci.", http.StatusNotFound)
		return
	}

	var networkDetails []NetworkInfo
	for _, networkName := range networks {
		cmd = exec.Command("docker", "network", "inspect", networkName)
		output, err := cmd.CombinedOutput()
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy inspect dla sieci %s: %v", networkName, err), http.StatusInternalServerError)
			return
		}

		var networkInfo []map[string]interface{}
		err = json.Unmarshal(output, &networkInfo)
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas parsowania JSON dla sieci %s: %v", networkName, err), http.StatusInternalServerError)
			return
		}

		if len(networkInfo) > 0 {
			// Sprawdzanie, czy istnieje konfiguracja IPAM
			ipamConfig := networkInfo[0]["IPAM"].(map[string]interface{})["Config"]
			var subnet, gateway string
			if ipamConfig != nil {
				// Sprawdzamy, czy istnieje subnet i gateway
				configList, ok := ipamConfig.([]interface{})
				if ok && len(configList) > 0 {
					configMap, ok := configList[0].(map[string]interface{})
					if ok {
						if s, exists := configMap["Subnet"]; exists {
							subnet = s.(string)
						}
						if g, exists := configMap["Gateway"]; exists {
							gateway = g.(string)
						}
					}
				}
			}

			
			networkDetails = append(networkDetails, NetworkInfo{
				Name:    networkInfo[0]["Name"].(string),
				ID:      networkInfo[0]["Id"].(string),
				Driver:  networkInfo[0]["Driver"].(string),
				Scope:   networkInfo[0]["Scope"].(string),
				Created: networkInfo[0]["Created"].(string),
				Subnet:  subnet,  // Może być pusty, jeśli brak
				Gateway: gateway, // Może być pusty, jeśli brak
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	prettyJSON, err := json.MarshalIndent(networkDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(prettyJSON)
}



func getImageDetails(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	cmd := exec.Command("docker", "images", "-q")
	imageIDs, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy: %v", err), http.StatusInternalServerError)
		return
	}

	images := strings.Fields(string(imageIDs))
	if len(images) == 0 {
		http.Error(w, "Brak obrazów.", http.StatusNotFound)
		return
	}

	var imageDetails []ImageInfo
	for _, imageID := range images {
		cmd = exec.Command("docker", "inspect", "--format", "{{.Id}},{{.RepoTags}},{{.Created}},{{.Size}}", imageID)
		output, err := cmd.CombinedOutput()
		if err != nil {
			http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy inspect dla obrazu %s: %v", imageID, err), http.StatusInternalServerError)
			return
		}

		parts := strings.Split(string(output), ",")
		if len(parts) == 4 {
			imageDetails = append(imageDetails, ImageInfo{
				ID:         parts[0],
				Repository: parts[1],
				Tag:        parts[1],
				Created:    parts[2],
				Size:       parts[3],
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	prettyJSON, err := json.MarshalIndent(imageDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(prettyJSON)
}

func getContainerStats(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)


	containerID := strings.TrimPrefix(r.URL.Path, "/containers/") 

	
	if containerID == "" {
		http.Error(w, "ID kontenera jest wymagane", http.StatusBadRequest)
		return
	}

	
	statsCmd := exec.Command("docker", "stats", "--no-stream", "--format", "{{.CPUPerc}},{{.MemPerc}}", containerID)
	statsOutput, err := statsCmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy stats dla kontenera %s: %v", containerID, err), http.StatusInternalServerError)
		return
	}

	stats := strings.TrimSpace(string(statsOutput))
	statsParts := strings.Split(stats, ",")
	if len(statsParts) != 2 {
		http.Error(w, "Błąd podczas parsowania statystyk kontenera", http.StatusInternalServerError)
		return
	}

	cpuUsage := statsParts[0]
	memoryUsage := statsParts[1]

	
	containerStats := ContainerStats{
		CPUUsage:    cpuUsage,
		MemoryUsage: memoryUsage,
	}

	w.Header().Set("Content-Type", "application/json")
	prettyJSON, err := json.MarshalIndent(containerStats, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(prettyJSON)
}

type ContainerState struct {
    Status     string `json:"Status"`
    Running    bool   `json:"Running"`
    Restarting bool   `json:"Restarting"`
}

type ContainerNetworkSettings struct {
    Ports     map[string]interface{}            `json:"Ports"` 
    IPAddress string                            `json:"IPAddress"`
    Networks  map[string]map[string]interface{} `json:"Networks"` 
}



type PortBinding struct {
    HostIp   string `json:"HostIp"`
    HostPort string `json:"HostPort"`
}

type ContainerHostConfig struct {
    ShmSize      int                      `json:"ShmSize"`
    CpuShares    int                      `json:"CpuShares"`
    PortBindings map[string][]PortBinding `json:"PortBindings"` 
}

type ContainerConfig struct {
    Env []string `json:"Env"`
    Cmd []string `json:"Cmd"`
}

type ContainerDetails struct {
    Id              string                   `json:"Id"`
    Name            string                   `json:"Name"`
    State           ContainerState           `json:"State"`
    NetworkSettings ContainerNetworkSettings `json:"NetworkSettings"`
    HostConfig      ContainerHostConfig      `json:"HostConfig"`
    Config          ContainerConfig          `json:"Config"`
    Created         string                   `json:"Created"`
    Path            string                   `json:"Path"`
    RestartCount    int                      `json:"RestartCount"`
    Platform        string                   `json:"Platform"`
    Image           string                   `json:"Image"`
}

func getContainerSummary(w http.ResponseWriter, r *http.Request) {
    setCORSHeaders(w)

    containerID := strings.TrimPrefix(r.URL.Path, "/info/")

    if containerID == "" {
        http.Error(w, "ID kontenera jest wymagane", http.StatusBadRequest)
        return
    }

    cmd := exec.Command("docker", "inspect", containerID)
    output, err := cmd.CombinedOutput()
    if err != nil {
        http.Error(w, fmt.Sprintf("Błąd podczas wykonywania komendy inspect dla kontenera %s: %v", containerID, err), http.StatusInternalServerError)
        log.Printf("Error executing docker inspect command: %v\n", err)
        return
    }

    var containerDetails []ContainerDetails
    if err := json.Unmarshal(output, &containerDetails); err != nil {
        http.Error(w, fmt.Sprintf("Błąd przy parsowaniu JSON: %v", err), http.StatusInternalServerError)
        log.Printf("Error unmarshaling JSON: %v\n", err)
        return
    }

    if len(containerDetails) == 0 {
        http.Error(w, "Nie znaleziono kontenera", http.StatusNotFound)
        return
    }

    container := containerDetails[0]

   
    summary := map[string]interface{}{
        "Id":           container.Id,
        "Name":         container.Name,
        "Status":       container.State.Status,
        "Running":      container.State.Running,
        "Restarting":   container.State.Restarting,
        "Created":      container.Created,
        "Path":         container.Path,
        "RestartCount": container.RestartCount,
        "Platform":     container.Platform,
        "Image":        container.Image,
        "Ports":        container.NetworkSettings.Ports,
        "PortBindings": container.HostConfig.PortBindings,
        "NetworkID":    "",
        "IPAddress":    container.NetworkSettings.IPAddress,
        "Memory":       container.HostConfig.ShmSize,
        "CPU":          container.HostConfig.CpuShares,
        "Env":          container.Config.Env,
        "Cmd":          container.Config.Cmd,
    }

    
    if bridge, exists := container.NetworkSettings.Networks["bridge"]; exists {
        if networkID, exists := bridge["NetworkID"]; exists {
            summary["NetworkID"] = networkID
        }
    }

   
    w.Header().Set("Content-Type", "application/json")

    prettyJSON, err := json.MarshalIndent(summary, "", "  ")
    if err != nil {
        http.Error(w, fmt.Sprintf("Błąd przy formatowaniu JSON: %v", err), http.StatusInternalServerError)
        log.Printf("Error marshaling JSON: %v\n", err)
        return
    }
    w.Write(prettyJSON)
}







func startContainer(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	containerID := strings.TrimPrefix(r.URL.Path, "/start/")

	
	cmd := exec.Command("docker", "start", containerID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas uruchamiania kontenera: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Kontener %s uruchomiony.", containerID)))
}


func restartContainer(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	containerID := strings.TrimPrefix(r.URL.Path, "/restart/")

	
	cmd := exec.Command("docker", "restart", containerID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas restartu kontenera: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Kontener %s zrestartowany.", containerID)))
}


func stopContainer(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	containerID := strings.TrimPrefix(r.URL.Path, "/stop/")

	
	cmd := exec.Command("docker", "stop", containerID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas zatrzymywania kontenera: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Kontener %s zatrzymany.", containerID)))
}


func removeContainer(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	containerID := strings.TrimPrefix(r.URL.Path, "/remove/")

	
	cmd := exec.Command("docker", "rm", containerID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas usuwania kontenera: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Kontener %s usunięty.", containerID)))
}


func removeImage(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	imageID := strings.TrimPrefix(r.URL.Path, "/remove/image/")

	
	cmd := exec.Command("docker", "rmi", imageID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas usuwania obrazu: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Obraz %s usunięty.", imageID)))
}


func removeNetwork(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	networkID := strings.TrimPrefix(r.URL.Path, "/remove/network/")

	
	cmd := exec.Command("docker", "network", "rm", networkID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas usuwania sieci: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Sieć %s usunięta.", networkID)))
}


func removeVolume(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	volumeID := strings.TrimPrefix(r.URL.Path, "/remove/volume/")

	
	cmd := exec.Command("docker", "volume", "rm", volumeID)
	err := cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Błąd podczas usuwania wolumenu: %v", err), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(fmt.Sprintf("Wolumen %s usunięty.", volumeID)))
}


func main() {
	http.HandleFunc("/containers", getContainerDetails)
	http.HandleFunc("/volumes", getVolumeDetails)
	http.HandleFunc("/networks", getNetworkDetails)
	http.HandleFunc("/images", getImageDetails)
	http.HandleFunc("/containers/", getContainerStats)
	http.HandleFunc("/info/", getContainerSummary) 

	http.HandleFunc("/start/", startContainer)
	http.HandleFunc("/restart/", restartContainer)
	http.HandleFunc("/stop/", stopContainer)
	http.HandleFunc("/remove/", removeContainer)

	http.HandleFunc("/remove/image/", removeImage)
	http.HandleFunc("/remove/network/", removeNetwork)
	http.HandleFunc("/remove/volume/", removeVolume)

	
	fmt.Println("Serwer uruchomiony na porcie 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Błąd serwera: %v\n", err)
	}
}
