
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
*  Docker engine - Container process execution API 
*  Version : v1.0.0-Alpha
*  Author  : Ashfaq Ahmed S [https://github.com/0yukikaze0]
* +--------------------------------------------------------------+
*/
var Constants   =   require('./Constants');
var Bifrost     =   require('./Bifrost');

class ExecHandler{
    
    constructor(socketPath){
        this._bifrost = new Bifrost(socketPath);
    }

    execProcess(container, execString) {
        return new Promise((respond,reject) => {
            let request = {
                AttachStdin     : false,
                AttachStdout    : false,
                AttachStderr    : false,
                Tty             : false,
                Cmd             : execString
            }
            /**
             * [1] - Create an exec instance
             *          +- This will return an exec instance "Id"
             * [2] - Start exec instance from [1]
             */
            // [1]
            this._bifrost.transmitRequest(Constants.POST, `/containers/${container}/exec`)
                // [2]
                .then(  (response)  => this.startExecId(JSON.stringify(response)['Id']),
                        (err)       =>  reject(err) )
                .then(  (response)  =>  respond(response),
                        (err)       =>  reject(err) )
        });
    }

    startExecId(execId){
        return new Promise((respond,reject) => {
            this._bifrost.transmitRequest(Constants.POST, `/exec/${execId}/start`, {})
                .then(  (response)  =>  respond(response),
                        (err)       =>  reject(err))
        });
    }

}

module.exports = ExecHandler;