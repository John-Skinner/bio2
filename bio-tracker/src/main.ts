import { createApp } from 'vue'
import { Col, Row } from 'vant'
import { Button } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Radio, RadioGroup, Switch, DropdownMenu, DropdownItem } from 'vant';
import { PasswordInput, NumberKeyboard} from 'vant';
import { Locale } from 'vant';
import  enUS  from 'vant/es/locale/lang/en-US'
import { Calendar, Cell } from 'vant';
import { ConfigProvider } from 'vant';
import { Toast } from 'vant';



import 'vant/lib/index.css'
import App from './App.vue'

const app = createApp(App);
import './style.css'
Locale.use('en-US',enUS);
app.use(Col);
app.use(Row);
app.use(Checkbox)
app.use(CheckboxGroup);
app.use(Button);
app.use(Radio);
app.use(RadioGroup);
app.use(Switch);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Calendar)
app.use(Cell)
app.use(ConfigProvider)
app.use(PasswordInput);
app.use(NumberKeyboard);
app.use(Toast);



app.mount('#app')
