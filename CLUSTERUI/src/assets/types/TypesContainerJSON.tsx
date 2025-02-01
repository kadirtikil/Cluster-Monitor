export interface ContainerJSON {
  ContainerJSONBase: ContainerJSONBase,
	Mounts:          MountPoint[],
	Config:          string,
	NetworkSettings: NetworkSettings
}
    
export interface ContainerJSONBase{
    Id:              string,
    Created:         string,
    Path:            string,
    Args:            string[],
    State:           ContainerState,
    Image:           string,
    ResolvConfPath:  string,
    HostnamePath:    string,
    HostsPath:       string,
    LogPath:         string,
    Node:            ContainerNode, // Deprecated: Node was only propagated by Docker Swarm standalone API. It sill be removed in the next release.
    Name:            string,
    RestartCount:    number,
    Driver:          string,
    Platform:        string,
    MountLabel:      string,
    ProcessLabel:    string,
    AppArmorProfile: string,
    ExecIDs:         string[],
    HostConfig:      string,
    GraphDriver:     string,
    SizeRw:          number, 
    SizeRootFs:      number, 
}


export interface ContainerState {
	Status:     string,
	Running:    boolean,
	Paused:     boolean,
	Restarting: boolean,
	OOMKilled:  boolean,
	Dead:       boolean,
	Pid:        number,
	ExitCode:   number,
	Error:      string,
	StartedAt:  string,
	FinishedAt: string,
	Health:     string,
}

export interface ContainerNode {
	ID:        string,
	IPAddress: string,
	Addr:      string,
	Name:      string,
	Cpus:      number,
	Memory:    number,
	Labels:    { [key: string]: string },
}


export interface MountPoint {
	Type:            string,
	Name:            string,
	Source:          string,
	Destination:     string,
	Driver:          string,
	Mode:            string,
	RW:              boolean,
	Propagation:     string,
}


export interface NetworkSettingsBase {
	Bridge:                     string,      
	SandboxID:                  string,      
	SandboxKey:                 string,      
	Ports:                      string,
	HairpinMode:                boolean,
	LinkLocalIPv6Address:       string,
	LinkLocalIPv6PrefixLen:     number,
}

export interface NetworkSettings {
    NetworkSettingsBase: NetworkSettingsBase,
    DefaultNetworkSettings: string,
	Networks: string,
}

export const dummyContainerJSON: ContainerJSON = {
    ContainerJSONBase: {
      Id: "dummy-id-12345",
      Created: "2025-01-01T00:00:00Z",
      Path: "/bin/sh",
      Args: ["/bin/sh", "-c", "echo Hello World"],
      State: {
        Status: "running",
        Running: true,
        Paused: false,
        Restarting: false,
        OOMKilled: false,
        Dead: false,
        Pid: 1234,
        ExitCode: 0,
        Error: "",
        StartedAt: "2025-01-01T00:01:00Z",
        FinishedAt: "0001-01-01T00:00:00Z",
        Health: "healthy",
      },
      Image: "dummy-image",
      ResolvConfPath: "/etc/resolv.conf",
      HostnamePath: "/etc/hostname",
      HostsPath: "/etc/hosts",
      LogPath: "/var/log/container.log",
      Node: {
        ID: "dummy-node-1",
        IPAddress: "192.168.1.10",
        Addr: "192.168.1.10:2375",
        Name: "dummy-node-1",
        Cpus: 4,
        Memory: 8192,
        Labels: {
          "role": "worker",
          "environment": "test",
        },
      },
      Name: "dummy-container",
      RestartCount: 0,
      Driver: "overlay2",
      Platform: "linux",
      MountLabel: "dummy-mount-label",
      ProcessLabel: "dummy-process-label",
      AppArmorProfile: "default",
      ExecIDs: ["exec1", "exec2"],
      HostConfig: "{}",
      GraphDriver: "aufs",
      SizeRw: 1024,
      SizeRootFs: 4096,
    },
    Mounts: [
      {
        Type: "volume",
        Name: "dummy-volume",
        Source: "/mnt/dummy-volume",
        Destination: "/container/mnt",
        Driver: "local",
        Mode: "rw",
        RW: true,
        Propagation: "rprivate",
      },
    ],
    Config: "dummy-config",
    NetworkSettings: {
        NetworkSettingsBase: {
            Bridge:                     "dummy",      
            SandboxID:                  "dummy",      
            SandboxKey:                 "dummy",      
            Ports:                      "dummy",
            HairpinMode:                false,
            LinkLocalIPv6Address:       "dummy",
            LinkLocalIPv6PrefixLen:     123,
        },
        DefaultNetworkSettings: "dummy",
        Networks: "dummy",
    },
  };


export const dummyContainerJSONBase: ContainerJSONBase = {
    Id: "dummy-container-id-12345",
    Created: "2025-01-01T00:00:00Z",
    Path: "/bin/sh",
    Args: ["-c", "echo 'Hello, World!'"],
    State: {
      Status: "running",
      Running: true,
      Paused: false,
      Restarting: false,
      OOMKilled: false,
      Dead: false,
      Pid: 12345,
      ExitCode: 0,
      Error: "",
      StartedAt: "2025-01-01T00:01:00Z",
      FinishedAt: "0001-01-01T00:00:00Z",
      Health: "healthy",
    },
    Image: "dummy-image:latest",
    ResolvConfPath: "/dummy/etc/resolv.conf",
    HostnamePath: "/dummy/etc/hostname",
    HostsPath: "/dummy/etc/hosts",
    LogPath: "/dummy/var/log/container.log",
    Node: {
      ID: "dummy-node-123",
      IPAddress: "192.168.1.100",
      Addr: "192.168.1.100:2375",
      Name: "dummy-node",
      Cpus: 4,
      Memory: 8192,
      Labels: {
        "role": "worker",
        "environment": "testing",
      },
    },
    Name: "dummy-container",
    RestartCount: 0,
    Driver: "overlay2",
    Platform: "linux/amd64",
    MountLabel: "dummy-mount-label",
    ProcessLabel: "dummy-process-label",
    AppArmorProfile: "dummy-apparmor-profile",
    ExecIDs: ["dummy-exec-1", "dummy-exec-2"],
    HostConfig: "{}",
    GraphDriver: "aufs",
    SizeRw: 10240,  // 10MB
    SizeRootFs: 51200,  // 50MB
  };
  
  