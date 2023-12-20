import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/main/DashboardPage";
import CardPage from "../pages/main/mails/CardPage";
import BacklogCardsListingPage from "@/pages/main/mails/BacklogCardsListingPage";
import ActiveCardsListingPage from "@/pages/main/mails/ActiveCardsListingPage";
import AllCardsListingPage from "@/pages/main/mails/AllCardsListingPage";
import CardCreateFormPage from "@/pages/main/mails/create/CardCreateFormPage";

Vue.use(Router);

let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: {name: 'dashboard'}
        },
        {
            path: '/main',
            component: MainLayout,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: DashboardPage
                },
                {
                    path: 'cards/backlog',
                    name: 'cards-listing-backlog',
                    component: BacklogCardsListingPage
                },
                {
                    path: 'cards/active',
                    name: 'cards-listing-active',
                    component: ActiveCardsListingPage
                },
                {
                    path: 'cards/all',
                    name: 'cards-listing-all',
                    component: AllCardsListingPage
                },
                {
                    path: 'card/create',
                    name: 'card-create-form',
                    component: CardCreateFormPage
                },
                {
                    path: 'card/view/:id',
                    name: 'card-view',
                    component: CardPage
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next({name: 'dashboard'})
    }
})

export default router
