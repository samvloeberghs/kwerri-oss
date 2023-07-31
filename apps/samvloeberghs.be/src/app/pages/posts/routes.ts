import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { environment } from '../../environment';

export const routes = [
    {
        path: '',
        component: PostsComponent,
        data: {
            seo: {
                title: `Posts - ${ environment.seo.title }`,
                description: `Whenever I find the time, I try to write down what I've been working on. Here you can find all of my posts.`,
                shareImg: '/assets/share/projects-talksworkshops.png',
            },
        },
    },
    {
        path: ':slug',
        component: PostComponent,
    },
];
