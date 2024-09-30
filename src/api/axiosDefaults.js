import axios from 'axios'
import qs from 'qs'

if (import.meta.env.DEV) {
    axios.defaults.baseURL =
        'https://8000-evitaknits-stitchspacea-7teiu88dgwp.ws.codeinstitute-ide.net/'
} else {
    axios.defaults.baseURL =
        'https://stitch-space-api-007f388f42eb.herokuapp.com/'
}

axios.defaults.params = {}
axios.defaults.params['format'] = 'json'
// Allows handling of arrays of parameters
axios.defaults.paramsSerializer = (params) => qs.stringify(params)
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

// Handles JWT cookie
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withXSRFToken = (config) => !!config.useCredentials
axios.defaults.withCredentials = true

export default axios.create()
