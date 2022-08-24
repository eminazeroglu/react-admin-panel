import * as Yup from "yup";
import {translate} from "src/utils/helpers";

const $CLASS_NAME$Validation = () => {
    return Yup.object().shape({
        title: Yup.string()
            .required(translate('validation.required')),
    });
}

export default $CLASS_NAME$Validation;