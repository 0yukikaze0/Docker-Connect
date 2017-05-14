var Docker = require('./index');

function test(){

    let docker = new Docker('/var/run/docker.sock');

    docker.images.getAllImages().then( (result) => console.log(result))
    docker.containers.getAllContainers().then((result) => console.log(result))
    docker.network.getNetworkListing().then((result) => console.log(result));
}

test();