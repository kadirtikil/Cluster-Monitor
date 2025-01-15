
export const containerOp = async (data: string, url: string) => {
    try{
        console.log(data)
        const payload = {
            // 0,12 because docker only needs those in order to identify the container. i really dont know why it would take the whole id as well...
            ContainerID: data.substring(0, 12),
        }

        console.log(payload)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Success:", result);

    } catch(error) {
        console.error(error)
    }
}
