var Docker = require('./DockerConnect');

function test(){

    let docker = new Docker('/var/run/docker.sock');

    //docker.images.getAllImages().then( (result) => console.log(result))
    //docker.containers.getAllContainers().then((result) => console.log(result))
    //docker.network.getNetworkListing().then((result) => console.log(result));
    //docker.images.buildImage('xyz/pqr:1.0', 'https://github.com/0yukikaze0/Quorum-Workspace/blob/master/Docker/').then((response) => console.log(response), (err) => console.log(err))
    //docker.exec.execProcess('My_New_Test_Container', ['/bin/bash', '-sh', '"touch /data/xyz/hello"'])
    //docker.exec.execProcess('My_New_Test_Container', ['/bin/bash', '-sh', 'touch /data/xyz/hello'])
    //docker.exec.execProcess('My_New_Test_Container', ['/bin/bash', '-c "touch /data/xyz/hellothere"'])
    docker.exec.execProcess('My_New_Test_Container', ['/bin/bash', '-c', 'echo sq > /data/xyz/xhello'])
        .then( (response) => console.log(response),
                (err) => console.log(err));
}

test();