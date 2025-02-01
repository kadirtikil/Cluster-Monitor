

export const testJson = {
    "action": "kill",
    "data": {
      "Id": "e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42",
      "Created": "2025-01-04T09:34:46.575058822Z",
      "Path": "tail",
      "Args": [
        "-f",
        "/dev/null"
      ],
      "State": {
        "Status": "exited",
        "Running": false,
        "Paused": false,
        "Restarting": false,
        "OOMKilled": false,
        "Dead": false,
        "Pid": 0,
        "ExitCode": 137,
        "Error": "",
        "StartedAt": "2025-01-16T20:46:47.057397119Z",
        "FinishedAt": "2025-01-16T20:46:53.812787929Z"
      },
      "Image": "sha256:b1d9df8ab81559494794e522b380878cf9ba82d4c1fb67293bcf931c3aa69ae4",
      "ResolvConfPath": "/var/lib/docker/containers/e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42/resolv.conf",
      "HostnamePath": "/var/lib/docker/containers/e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42/hostname",
      "HostsPath": "/var/lib/docker/containers/e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42/hosts",
      "LogPath": "/var/lib/docker/containers/e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42/e142465a80ab4b6111b7c3f40c15220275ac7a453dd997d817d642a41ba10e42-json.log",
      "Name": "/test-container",
      "RestartCount": 0,
      "Driver": "overlay2",
      "Platform": "linux",
      "MountLabel": "",
      "ProcessLabel": "",
      "AppArmorProfile": "docker-default",
      "ExecIDs": null,
      "HostConfig": {
        "Binds": null,
        "ContainerIDFile": "",
        "LogConfig": {
          "Type": "json-file",
          "Config": {}
        },
        "NetworkMode": "bridge",
        "PortBindings": {},
        "RestartPolicy": {
          "Name": "no",
          "MaximumRetryCount": 0
        },
        "AutoRemove": false,
        "VolumeDriver": "",
        "VolumesFrom": null,
        "ConsoleSize": [
          43,
          184
        ],
        "CapAdd": null,
        "CapDrop": null,
        "CgroupnsMode": "private",
        "Dns": [],
        "DnsOptions": [],
        "DnsSearch": [],
        "ExtraHosts": null,
        "GroupAdd": null,
        "IpcMode": "private",
        "Cgroup": "",
        "Links": null,
        "OomScoreAdj": 0,
        "PidMode": "",
        "Privileged": false,
        "PublishAllPorts": false,
        "ReadonlyRootfs": false,
        "SecurityOpt": null,
        "UTSMode": "",
        "UsernsMode": "",
        "ShmSize": 67108864,
        "Runtime": "runc",
        "Isolation": "",
        "CpuShares": 0,
        "Memory": 0,
        "NanoCpus": 0,
        "CgroupParent": "",
        "BlkioWeight": 0,
        "BlkioWeightDevice": [],
        "BlkioDeviceReadBps": [],
        "BlkioDeviceWriteBps": [],
        "BlkioDeviceReadIOps": [],
        "BlkioDeviceWriteIOps": [],
        "CpuPeriod": 0,
        "CpuQuota": 0,
        "CpuRealtimePeriod": 0,
        "CpuRealtimeRuntime": 0,
        "CpusetCpus": "",
        "CpusetMems": "",
        "Devices": [],
        "DeviceCgroupRules": null,
        "DeviceRequests": null,
        "MemoryReservation": 0,
        "MemorySwap": 0,
        "MemorySwappiness": null,
        "OomKillDisable": null,
        "PidsLimit": null,
        "Ulimits": [],
        "CpuCount": 0,
        "CpuPercent": 0,
        "IOMaximumIOps": 0,
        "IOMaximumBandwidth": 0,
        "MaskedPaths": [
          "/proc/asound",
          "/proc/acpi",
          "/proc/kcore",
          "/proc/keys",
          "/proc/latency_stats",
          "/proc/timer_list",
          "/proc/timer_stats",
          "/proc/sched_debug",
          "/proc/scsi",
          "/sys/firmware",
          "/sys/devices/virtual/powercap"
        ],
        "ReadonlyPaths": [
          "/proc/bus",
          "/proc/fs",
          "/proc/irq",
          "/proc/sys",
          "/proc/sysrq-trigger"
        ]
      },
      "GraphDriver": {
        "Data": {
          "LowerDir": "/var/lib/docker/overlay2/b5d92cebedaa2fe13274d52e431f7fd9032bbeeecc508e0e38c0d107b944fecd-init/diff:/var/lib/docker/overlay2/13789231cc2e343985b21d770b95c913b519c28b6cdb3c7d77a8bcb063704726/diff",
          "MergedDir": "/var/lib/docker/overlay2/b5d92cebedaa2fe13274d52e431f7fd9032bbeeecc508e0e38c0d107b944fecd/merged",
          "UpperDir": "/var/lib/docker/overlay2/b5d92cebedaa2fe13274d52e431f7fd9032bbeeecc508e0e38c0d107b944fecd/diff",
          "WorkDir": "/var/lib/docker/overlay2/b5d92cebedaa2fe13274d52e431f7fd9032bbeeecc508e0e38c0d107b944fecd/work"
        },
        "Name": "overlay2"
      },
      "Mounts": [],
      "Config": {
        "Hostname": "e142465a80ab",
        "Domainname": "",
        "User": "",
        "AttachStdin": false,
        "AttachStdout": false,
        "AttachStderr": false,
        "Tty": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Env": [
          "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        ],
        "Cmd": [
          "tail",
          "-f",
          "/dev/null"
        ],
        "Image": "ubuntu",
        "Volumes": null,
        "WorkingDir": "",
        "Entrypoint": null,
        "OnBuild": null,
        "Labels": {
          "org.opencontainers.image.ref.name": "ubuntu",
          "org.opencontainers.image.version": "24.04"
        }
      },
      "NetworkSettings": {
        "Bridge": "",
        "SandboxID": "",
        "SandboxKey": "",
        "Ports": {},
        "HairpinMode": false,
        "LinkLocalIPv6Address": "",
        "LinkLocalIPv6PrefixLen": 0,
        "SecondaryIPAddresses": null,
        "SecondaryIPv6Addresses": null,
        "EndpointID": "",
        "Gateway": "",
        "GlobalIPv6Address": "",
        "GlobalIPv6PrefixLen": 0,
        "IPAddress": "",
        "IPPrefixLen": 0,
        "IPv6Gateway": "",
        "MacAddress": "",
        "Networks": {
          "bridge": {
            "IPAMConfig": null,
            "Links": null,
            "Aliases": null,
            "MacAddress": "",
            "DriverOpts": null,
            "NetworkID": "6afb10e58233751a9b8e85db696155a947a9802058503381fb0926f1deecc596",
            "EndpointID": "",
            "Gateway": "",
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "DNSNames": null
          }
        }
      }
    }
  }
  