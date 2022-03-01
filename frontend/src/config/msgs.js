import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use( Toasted, {
    iconPack: 'fontawasome',
    duration: 3000
})

Vue.toasted.register(
    'defaltSuccess',
    'Operação realizada com sucesso!',
    {type: 'success', icon:'check'}
)
 Vue.toasted.register(
     'defaltError',
     payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
     { type: 'error', icon:'times' }
 )