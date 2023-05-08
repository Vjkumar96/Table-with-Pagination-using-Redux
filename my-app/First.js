import { useEffect, useState } from "react";

export default function First() {

    const [user,setuser] = useState([])

    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => setuser(res))
    })
    return (  
        <div className = "APP">
            {user.map(u => (
                <div>
                 <h1>Welcome</h1>
                    
                </div>
            ))}

        </div>
    )
        
}