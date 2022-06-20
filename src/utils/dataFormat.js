import { format, isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

class dataFormat {

   isValidDate(props) {
        const parsedDate = new Date(props)
        return parsedDate instanceof Date && !isNaN(parsedDate)
      }

    brToIso(props){
        if (!props) return 0
        
        const splitedDate = props.split('/')
        const isoDate = splitedDate[2]+"-"+splitedDate[1]+"-"+splitedDate[0]

        return isoDate
    }

    fullDateBR(props) {

        if (!props) {
            return 0
        }
        else {
            let date = new Date(props);
            return date.toLocaleDateString('pt-br', { timeZone: 'UTC' })
        }
    };

    iso(props) {

        if (!props) {
            return 0
        }
        else {

            let date
            if(typeof props == "string"){
                const utcStringFormated = props.replace("Z", "")
                date = new Date(utcStringFormated);
            } else if(typeof props == "number"){
                date = new Date(props);
            } else(
                date = props
            )
            if (!isValid(date)) {
                return 0
            } else {
                let newDate = format(date, 'yyyy-MM-dd', { locale: ptBR });
                return newDate;
            }
        }


    };

    day(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getDate()
        }
    };

    month(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getMonth()
        }
    };

    fullMonth(props) {

        if (!props) {
            return 0
        }
        else {
            let date = new Date(props);
            return date.toLocaleDateString('pt-BR', { timeZone: 'UTC', month: 'long' })
        }
    };

    year(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getFullYear()
        }
    };
};

export default new dataFormat();