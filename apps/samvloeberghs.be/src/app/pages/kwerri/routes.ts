import { KwerriComponent } from './kwerri.component';
import { environment } from '../../environment';

export const routes = [
    {
        path: '',
        component: KwerriComponent,
        data: {
            seo: {
                title: `Kwerri - ${ environment.seo.title }`,
                description: 'Kwerri provides specialised consultancy in web engineering. For me personally, Kwerri acts as my own incubator, allowing me to freelance on different projects + start my own.',
                shareImg: '/assets/share/kwerri.png',
            },
        },
    },
];
