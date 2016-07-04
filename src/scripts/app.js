import ReactDOM from 'react-dom'
import React from 'react'
import TasksView from './Components'
import Backbone from 'backbone'


const app = function() {

    const TaskModel = Backbone.Model.extend({
        defaults: {
            smemo: 'memo'
        }
    })

    const TaskCollection = Backbone.Collection.extend({
        model: TaskModel
    })

    ReactDOM.render(<TasksView tasksColl={new TaskCollection()} />,document.querySelector('.container'))
}

app()