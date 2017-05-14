/**
    Docker-Connect - Docker connectivity client (docker-connect)
    Copyright (C) 2017  Ashfaq Ahmed Shaik

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
* +--------------------------------------------------------------+
*  Docker engine - Container management API 
*  Version : v1.0.0-Alpha
*  Author  : Ashfaq Ahmed S [https://github.com/0yukikaze0]
* +--------------------------------------------------------------+
*/
var Constants   =   require('./Constants')
var Bifrost     =   require('./Bifrost');

class ContainerHandler{

    constructor(socketPath){
        this._bifrost = new Bifrost(socketPath);
    }

    /**
     * Returns a JSON listing of all docker containers
     * @function {getAllContainers}
     * @return {Promise}
     */
    getAllContainers() {
        return new Promise((respond, reject) => {            
            this._bifrost.transmitRequest(Constants.GET,'/containers/json', {all:true})
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        })
    }

    /**
     * @function {getConatainersByStatus}
     * @param  {string | array} Status List {comma separated string or array}
     * @return {Promise}
     */
    getContainersByStatus(statusList){
        return new Promise((respond,reject) => {
            let statusFilter = [];
            if(typeof statusList === 'string'){
               if(statusList.includes(',')){
                   let listing = statusList.split(',');
                   statusFilter = listing;
               } else {
                   statusFilter.push(statusList);
               }
            } else if (typeof statusList === 'object'){
               statusFilter = statusList;
            }

            this._bifrost.transmitRequest(Constants.GET, '/containers/json', `filters={"status":${JSON.stringify(statusFilter)}}`)
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        });
    }

    /**
     * @function {createContainer}
     * @param  {Object} Request parameters packed into JSON {Name of the container}
     * @return {Promise} 
     */
    createContainer(params) {
        return new Promise((respond,reject) => {
            
            let containerName = params.containerName.replace(/ /g,'_');
            
            let attachStdOut    = true;
            let attachStdIn     = true;
            let attachStdErr    = true;
            
            if(params.detached === true){
                attachStdOut    = false;
                attachStdIn     = false;
                attachStdErr    = false;
            }

            /** Build request */
            let request = {
                "Image" : params.image,
                "Cmd" : params.cmd,
                "AttachStdout" : attachStdOut,
                "Tty" : params.tty,
                "ExposedPorts" : params.exposedPorts,
                "HostConfig":{
                    "Binds" : params.mounts,
                    "PortBindings" : params.ports,
                    "NetworkMode" : params.networkName 
                }
            }
            this._bifrost.transmitRequest(Constants.POST, '/containers/create', request, `name=${containerName}`)
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        });
    }

    /**
     * Starts a container matching the provided name/id
     * @function {startContainer}
     * @param  {string} containerName | Id {Name or Id of the container to start}
     * @return {Promise} {description}
     */
    startContainer(container) {
        return new Promise((respond,reject) => {
            this._bifrost.transmitRequest(Constants.POST, `/containers/${container}/start`,{})
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        });
    }
    
    /**
     * Stops a container matching the provided name/id
     * @function {stopContainer}
     * @param  {string} containerName | Id {Name or Id of the container to start}
     * @return {Promise} {description}
     */
    stopContainer(container) {
        return new Promise((respond,reject) => {
             this._bifrost.transmitRequest(Constants.POST, `/containers/${container}/stop`,{})
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        });
    }

}

module.exports = ContainerHandler;