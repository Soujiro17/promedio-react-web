import { React } from 'react'

export default function Field(props) {

    const { count, arrayNotas, arrayPercentages, id } = props;

    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n', 'ñ','o','p','q','r','s','t','u','v','w','x','y','z', ' ']

    const addNota = (nota) => {
        let result = false
        nota = nota.toLowerCase()
        console.log(nota)
        alphabet.map(element => {
            if(nota.includes(element)){
                result = true
            }
        })
        if (nota.length < 2 || result) {
            arrayNotas[id] = false;
        }
        else if(nota.length === 2){
            arrayNotas[id] = nota;
        }
    }

    const addPercentage = (percentage) => {
        let result = false
        alphabet.map(element => {
            if(percentage.includes(element)){
                result = true
            }
        })
        if(percentage.length < 2 || result){
            arrayPercentages[id] = false;
        }
        else if(percentage.length === 2){
            arrayPercentages[id] = percentage;
        }
    }

    return (
        <div>
            <span className = "nota-percentage">Nota {count}:</span>
            <input type = "text" name = "nota" maxLength = "2" onChange = {(e) => addNota(e.target.value)} placeholder = "ej: 45"/>
            <span className = "nota-percentage">Porcentaje {count}:</span>
            <input type = "text" name = "percentage" maxLength = "2" onChange = {(e) => addPercentage(e.target.value)} placeholder = "ej: 20"/>%
            <hr></hr>
        </div>
    )
}
