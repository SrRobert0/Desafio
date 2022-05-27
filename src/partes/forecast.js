import React, { Component } from "react";

import '../index.css';
import api from './api';

// Aqui são mostradas as previsões dos próximos 5 dias

class Forecast extends Component {
    render() {
        return (
            <div class="forecast">
                <ul id="previsoes">
                    {/* Previsões aqui! */}
                </ul>
            </div>
        );
    }
}

export default Forecast;