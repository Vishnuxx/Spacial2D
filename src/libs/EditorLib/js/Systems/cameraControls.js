import {OrbitControls} from "../../vendor/OrbitControls.js"

function createCameraControls(object , domElement) {
    const controls =  new OrbitControls(object , domElement)
    return controls
}

export default createCameraControls;