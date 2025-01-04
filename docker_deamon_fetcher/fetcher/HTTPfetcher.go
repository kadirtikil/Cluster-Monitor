package fetcher

import(
    "net/http"
)

func HttpFetcher(w http.ResponseWriter, r *http.Request) {
    // if test passed
    return_value := FetchContainers()
    if true {
        w.Write([]byte(return_value))
    }

}
