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
*  Docker engine - Network Management API 
*  Version : v1.0.0-Alpha
*  Author  : Ashfaq Ahmed S [https://github.com/0yukikaze0]
* +--------------------------------------------------------------+
*/

var Constants   =   require('./Constants');
var Bifrost     =   require('./Bifrost');

class NetworkHandler{
    constructor(socketPath){
        this._bifrost = new Bifrost(socketPath);
    }

    /**
     * Returns list of current docker networks
     * @function {getNetworkListing}
     * @return {Promise}
     */
    getNetworkListing() {
        return new Promise((respond,reject) => {
            this._bifrost.transmitRequest(Constants.GET, '/networks')
                .then(  (networks)  => respond(networks),
                        (err)       => reject(err)  );
        });
    }
    
    /**
     * Returns metadata for a network
     * @function {inspectNetwork}
     * @return {Promise}
     */
    inspectNetwork(networkName) {
        return new Promise((respond,reject) => {
            networkName = networkName.replace(/ /g,'_');            
            this._bifrost.transmitRequest(Constants.GET, '/networks',`filters={"name":{"${networkName}":true}}`)
                .then(  (networks)  => respond(networks),
                        (err)       => reject(err)  );
        });
    }

    /**
     * Creates a docker network with 
     * @function {createNetwork}
     * @param  {string} networkName {Name of the network}
     * @return {Promise} {Promise with network id}
     */
    createNetwork(networkName) {
        return new Promise((respond,reject) => {
            networkName = networkName.replace(/ /g,'_');
            this._bifrost.transmitRequest(Constants.POST, '/networks/create', {Name:networkName,Driver:"bridge"})
                .then(  (result)    => respond(result),
                        (err)       => reject(err)  )

        });
    }

    /**
     * Creates a docker network with 
     * @function {deleteNetwork}
     * @param  {string} networkName {Name of the network}
     * @return {Promise}
     */
    deleteNetwork(networkName) {
        return new Promise((respond,reject) => {
            networkName = networkName.replace(/ /g,'_');
            this.inspectNetwork(networkName)
                .then( (result) => {
                    if(result.length > 0){
                        let networkId = result[0].Id;
                        this._bifrost.transmitRequest(Constants.DELETE, `/networks/${networkId}`)
                            .then(  (result)    => respond(result),
                                    (err)       => reject(err)  )
                    } else {
                        console.log('Network doesnt exist')
                    }
                })
        });
    } 
}

module.exports = NetworkHandler;