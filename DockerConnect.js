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
*  Docker engine connectivity client 
*  Version : v1.0.0-Alpha
*  Author  : Ashfaq Ahmed S [https://github.com/0yukikaze0]
* +--------------------------------------------------------------+
*/

var ImageHandler        =   require('./handlers/ImageHandler');
var NetworkHandler      =   require('./handlers/NetworkHandler');
var ContainerHandler    =   require('./handlers/ContainerHandler');

class DockerConnect{

    constructor(socketPath){
        this.images     =   new ImageHandler(socketPath);
        this.network    =   new NetworkHandler(socketPath);
        this.containers =   new ContainerHandler(socketPath);
    }

}

module.exports = DockerConnect;