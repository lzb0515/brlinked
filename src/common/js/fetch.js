const ERR_OK = 0;

export function getFetch(url, data, fetchData) {
    this.$http.get(url).then(res=> {
        if (res.data.errno === ERR_OK) {
            this.data = res.data.fetchData;
        }
    })
}