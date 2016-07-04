import React from 'react'


const TasksView = React.createClass({
    getInitialState: function(){
        return{
            tasksColl: this.props.tasksColl
        }
    },
    componentWillMount: function(){
        // a pub sub
        console.log('bout to mount')
        // call in the collection
        this.props.tasksColl.on('update', () => {
            this.setState({
                tasksColl: this.state.tasksColl
            })
        })
    },
    _addTask: function(taskName) {
        this.props.tasksColl.add({
            name: taskName
        })
    },

    render: function() {
        console.log(this.props)
        return (
            <div id="tasksViewContainer">
                <Header />
                <TaskAdder _addTaskFromTasksView={this._addTask} />
                <TaskList tasksColl={this.state.tasksColl} />
            </div>
            )
    }
})

const TaskAdder = React.createClass({

    _handleTaskAdd: function(e) {
        if (e.keyCode === 13) {
            this.props._addTaskFromTasksView(e.target.value)
            e.target.value = ''
        }
    },

    render: function() {
        return (
            <input onKeyDown={this._handleTaskAdd} />
            )
    }
})

const TaskList = React.createClass({

    _getTaskComponents: function(tasksColl) {
        return tasksColl.map((mod) => <Task taskModel={mod} />)
    },

    render: function() {
        return (
            <ul id="taskList">
                {this._getTaskComponents(this.props.tasksColl)}
            </ul>
            )
    }
})

const Task = React.createClass({

    _changeSMEMO: function(e) {
        this.props.taskModel.set({
            smemo: e.target.value
        })
    },

    _killTask: function() {
  // console.log(this.props.taskModel.className)

        this.props.taskModel.destroy()
    },

    render: function() {

        var rsvpVal = this.props.taskModel.get('smemo')


        // ternary operator alert!
        var selectedVals = {
            memo: rsvpVal === 'memo' ? 'selected': '',
            smemo: rsvpVal === 'smemo' ? 'selected': '',
        }

        return (
            <div className="task">
                <span className="name">{this.props.taskModel.get('name')}</span>
                <select onChange={this._changeSMEMO}>
                    <option value="memo" selected={selectedVals.memo} >memo</option>
                    <option value="smemo" selected={selectedVals.smemo} >smemo</option>
                </select>
                <button onClick={this._killTask}>X</button>
            </div>
            )
    }
})

const Header = React.createClass({
    render: () => {
        return (
            <div id="headingContainer">
                <h1><img id="logo" src="http://www.arezzowave.com/wp-content/uploads/2014/03/Smemoranda_logo_hi-res_black.jpg" /></h1>
                <p>Things to forget ...</p>
            </div>
            )
    }
})

export default TasksView