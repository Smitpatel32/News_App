import React, { Component } from 'react'
import loading from '../Loading.gif'

export default class Load extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
