function card(props){
    return(
        <div className = "border-solid border-2 border-black rounded -md hover:bg-cyan-200 items-center flex flex-col p-2 cursor-pointer" onClick={props.onClick}>
            <img src= {props.image}/>
            {props.name}
        </div>
    );
}

export default card;