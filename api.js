// File A
import Vue from vue


// File B
import Vue from vue


['vue', 'vue-router', 'axios'] => vendor.js
['chartJS'] => chartjs.js
    => manifest.js

    a.js    

    import Axios from "axios"

['./a.js'] => a.js

['./b.js'] => b.js

api
    .entry(['vue', 'vue-router', 'axios'], 'vendor'\)
    .commonChunks()

api.entry(['chartjs'])


{
    [a.js, b.js] => output.js,
}


api
    .entry(['./a.js', './b.js'])
    .extractCommon()
    .extractCSS('common.css')
    .extractCommon('common.js')
    .extractVendor('vendor.js')