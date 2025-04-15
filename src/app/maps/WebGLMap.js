'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from "leaflet";

export default function WebGLMap({ points }) {
    var myIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    useEffect(() => {
        const loadScript = (src) =>
            new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = src;
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });

        loadScript('/Leaflet.CanvasOverlay.js')
            .then(() => loadScript('/Leaflet.WebGL.js'))
            .then(() => {
                console.log('All Leaflet plugins loaded:', L.webGL);
                const container = L.DomUtil.get('map');
                if (container && container._leaflet_id) {
                    L.DomUtil.remove(container);
                    const newDiv = document.createElement('div');
                    newDiv.id = 'map';
                    newDiv.style.height = '500px';
                    newDiv.style.width = '100%';
                    document.body.querySelector('#map-container').appendChild(newDiv);
                }
    
                const map = L.map('map').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);
                
                for (let point of points) {
                    const marker = L.marker([point.lat, point.lng], {icon: myIcon}).addTo(map);
                    marker.bindPopup(point.name);
                }
                // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

                const webGLLayer = L.webGL(function drawGL() {
                    L.WebGL.updateModelView();
                    console.log("Drawing on WebGL Layer");
                });
        
                // if (webGLLayer && typeof webGLLayer.addTo === 'function') {
                //     webGLLayer.addTo(map);
                // } else {
                //     console.log('webGLLayer is not a valid Leaflet layer:', webGLLayer);
                // }
            
                // Example: Add a WebGL layer
                // L.WebGL = L.webGL(function drawGL() {
                //     L.WebGL.updateModelView();
                //     console.log("WebGL layer drawing!");
                // }).addTo(map);

                // const canvas = L.WebGL.canvas();
                // const gl = L.WebGL.context();
            
                // // Load and compile shaders (ensure you have shader scripts in your HTML or load them dynamically)
                // const vertexShaderSource = `...`; // Replace with your vertex shader source
                // const fragmentShaderSource = `...`; // Replace with your fragment shader source
                // const program = L.WebGL.initShaders(vertexShaderSource, fragmentShaderSource);
            
                // // Set model view location and attribute locations
                // L.WebGL.setModelViewLocation('u_matrix');
                // program.vertexPosition = gl.getAttribLocation(program, 'a_vertex');
                // program.vertexColor = gl.getAttribLocation(program, 'a_color');
                // gl.enableVertexAttribArray(program.vertexPosition);
                // gl.enableVertexAttribArray(program.vertexColor);
            
                // Now, you can proceed with your WebGL drawing logic
            })
    
        // document.body.appendChild(script);
    
        // return () => {
        //   document.body.removeChild(script);
        // };
    }, []);

    return <div id="map-container"><div id="map" style={{ height: '500px', width: '100%' }} /></div>;
}
