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
*  Docker engine - Image management API 
*  Version : v1.0.0-Alpha
*  Author  : Ashfaq Ahmed S [https://github.com/0yukikaze0]
* +--------------------------------------------------------------+
*/

var Constants   =   require('./Constants');
var Bifrost     =   require('./Bifrost');

class ImageHandler{
    
    constructor(socketPath){
        this._bifrost = new Bifrost(socketPath);
    }

    /**
     * Returns an array of all available docker images
     * @function {getAllImages}
     * @return {Promise}
     */
    getAllImages() {
        return new Promise((respond, reject) => {
            this._bifrost.transmitRequest(Constants.GET,'/images/json')
                .then(  (response)  => respond(response),
                        (err)       => reject(err) );
        })        
    }

    buildImage(tag, dockerFilePath) {
        return new Promise((respond,reject) => {
            let params = {
                t : tag,
                remote : dockerFilePath 
            }
            this._bifrost.transmitRequest(Constants.POST, '/build', params)
                .then(  (response)  => respond(response),
                        (err)       => reject(err)  ); 
        });
    }
}

module.exports = ImageHandler;