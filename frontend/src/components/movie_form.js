import React, {useState, useEffect} from 'react';
import {API} from '../api_services'
import {useCookies} from 'react-cookie';
function MovieForm(props){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [token] = useCookies(['mrtoken']);


    useEffect( () => {
        setTitle(props.movie.title)
        setDescription(props.movie.description)
    }, [props.movie])

    const updateClicked = () => {
        // if key and variable are called the same, jave script provide
        // a convenient way to create dictionary
        API.updateMovie(props.movie.id, {title, description}, token['mrtoken'])
        .then(resp => props.updateMovie(resp))
        .catch(error => console.log(error))

    }

    const createClicked = () => {
        // if key and variable are called the same, jave script provide
        // a convenient way to create dictionary
        API.createMovie({title, description}, token['mrtoken'])
        .then(resp => props.movieCreated(resp))
        .catch(error => console.log(error))

    }

    const isDisabled = title.length === 0 || description.length === 0;

    return(
        <React.Fragment>
            {props.movie ? (
                <div>
                <label htmlFor="title">Title</label><br/>
                <input id="title" type="text" placeholder="titleput" value={title}
                onChange ={evt=>setTitle(evt.target.value)}
                /><br/>
                <label htmlFor="description">Description</label><br/>
                <textarea id="description" type="text" placeholder="description" value={description}
                onChange ={evt=>setDescription(evt.target.value)}>
                </textarea><br/>
                {props.movie.id ?
                    <button onClick={updateClicked} disabled={isDisabled}>Update</button>:
                    <button onClick={createClicked} disabled={isDisabled}>Create</button>
                }
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default MovieForm;