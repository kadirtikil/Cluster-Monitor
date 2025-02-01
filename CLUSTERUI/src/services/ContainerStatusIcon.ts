export const getDockerStatus = (status: string): string | null => {
    const validStatuses = [
        'Paused',
        'Up',
        'Exited',
        'Created',
        'Restarting',
        'Dead',
        'Removing',
        'Stopped'
    ];

    // check first if there is (Paused) at the end, 
    // cause Up is in that string as well then this function just returns Up and doesnt even see (Paused)
    // which is easier solved by just moving Paused to the first index lol im a genius

    for (const validStatus of validStatuses) {
        if (status.includes(validStatus)) {
            return validStatus
        }
    }

    return null
}
