import i18next from 'i18next';
import en from '../../../static_api/en.json'
import fr from '../../../static_api/fr.json'
i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: en
        },
        fr: {
            translation: fr
        }
    }
}, () => {

});

export default i18next