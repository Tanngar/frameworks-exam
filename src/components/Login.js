import React, { Component } from 'react';

export default class Login extends Component {

    constructor(match, props) {
        super(props);
    }

    // componentDidMount() {
    //     fetch(`${this.API_URL}/questions/`+ this.props.match.params.id)
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({
    //                 title: data[0].title,
    //                 description: data[0].description,
    //             })
    //         })
    // }

    render() {
        return (
            <div>
                <h3>Post new job offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><h6 className={"m-0"}>Title: </h6></label>
                        <input type="text"
                               name="title"
                               className="form-control  mb-2"
                               placeholder="Title of the position..."
                               onChange={this.onTitleChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Description: </h6></label>
                        <input type="text"
                               name="description"
                               className="form-control  mb-2"
                               placeholder="Description of the job..."
                               onChange={this.onDescriptionChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Category: </h6></label>
                        <input type="text"
                               name="category"
                               className="form-control  mb-2"
                               placeholder="Category..."
                               onChange={this.onDescriptionChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Area: </h6></label>
                        <input type="text"
                               name="area"
                               className="form-control  mb-2"
                               placeholder="Location..."
                               onChange={this.onDescriptionChange}
                               required
                        />
                        <input type='submit' className="btn btn-dark" value='Confirm'/>
                    </div>
                </form>
            </div>
        );
    }
}