import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRole } from './role.enum';

// Menu interface definition
export interface Menu {
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    badgeType?: string;
    badgeValue?: string;
    active?: boolean;
    bookmark?: boolean;
    children?: Menu[];
}

@Injectable({
    providedIn: 'root'
})

export class NavService {

    // Screen width and sidebar properties
    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen = false;

    // Menu items observable
    items = new BehaviorSubject<Menu[]>([]);

    // Constructor to initialize screen width and menu items
    constructor(private authService: AuthService) {
        this.onResize();
        if (this.screenWidth < 991) {
            this.collapseSidebar = true;
        }
        this.updateMenuItems();
    }

    // Method to update menu items based on user role
    public updateMenuItems() {
        const role = this.authService.getUserRole(); // Get the current user's role from AuthService
        let filteredMenu: Menu[] = [];

        switch (role) {
            case UserRole.ADMIN:
                filteredMenu = this.MENUITEMS; // Admin sees everything
                break;
                case UserRole.SUB:
                    // Filter out the "Sub Admin" menu item and update "Cash Transaction" children
                    filteredMenu = this.MENUITEMS
                        .filter(item => item.title !== 'Sub Admin') // Removes the Sub Admin item
                        .map(item => {
                            if (item.title === 'Cash Transaction' && item.children) {
                                // Filter out the specific child menu item for SUB role
                                item.children = item.children.filter(
                                    child => child.path !== '/cash-transaction/sub'
                                );
                            }
                            return item;
                        });
                    break;
            case UserRole.MASTER:
                filteredMenu = this.MASTERMENUITEMS;
                break;
            case UserRole.SUPER:
                filteredMenu = this.SUPERMENUITEMS;
                break;
            case UserRole.AGENT:
                filteredMenu = this.PROVIDERMENUITEMS;
                break;
            default:
                filteredMenu = this.MENUITEMS; // No menu items for undefined roles
                break;
        }
        this.items.next(filteredMenu);
    }

    // Method to handle window resize event
    onResize(event?: any) {
        this.screenWidth = window.innerWidth;
    }

    // Menu items for different user roles
    MENUITEMS: Menu[] = [
        { path: '/sub-admin', icon: "fa-address-card", title: 'Sub Admin', type: 'link' },
        { path: '/master', icon: "fa-address-card", title: 'Master Details', type: 'link' },
        { path: '/super', icon: "fa-address-card", active: true, title: 'Super Details', type: 'link' },
        { path: '/agent', icon: "fa-address-card", active: true, title: 'Agent Details', type: 'link' },
        { path: '/client', icon: "fa-address-card", active: true, title: 'Client Details', type: 'link' },
        {
            title: "Game",
            type: "sub",
            icon: "codepen",
            active: true,
            children: [
            ],
        },
        { path: '/game/inplay-details', title: 'Inplay Games', type: 'sub', icon: 'play' },
        { path: '/game/complete-game', title: 'Complete Games', type: 'sub', icon: 'pause' },
        {
            title: "Ledger",
            type: "sub",
            icon: "bookmark",
            active: true,
            children: [
            ],
        },
        { path: '/ledger/my-ledger', title: 'My Ledger', type: 'sub', icon: 'book-open' },
        { path: '/ledger/client/pm', title: 'Client Plus/Minus', type: 'sub', icon: 'plus-circle' },
        { path: '/ledger/client', title: 'All Client Ledger', type: 'sub', icon: 'book' },
        { path: '/ledger/agent', title: 'All Agent Ledger', type: 'sub', icon: 'book' },
        { path: '/ledger/super', title: 'All Super Ledger', type: 'sub', icon: 'book' },
        { path: '/ledger/master', title: 'All Master Ledger', type: 'sub', icon: 'book' },
        {
            title: "Cash Transaction",
            type: "sub",
            icon: "dollar-sign",
            active: true,
            children: [
                
            ],
        },
        { path: '/cash-transaction/client', title: 'Debit/Credit Entry (C)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/agent', title: 'Debit/Credit Entry (A)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/super', title: 'Debit/Credit Entry (S)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/master', title: 'Debit/Credit Entry (M)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/sub', title: 'Debit/Credit Entry (SUB)', type: 'sub', icon: 'chevrons-right' },
        {
            title: "Reports",
            type: "sub",
            icon: "clipboard",
            active: true,
            children: [
                {
                    title: 'Data Reports', type: 'sub', icon: 'database', children: [
                        { path: '/report/client', title: 'Client', type: 'link' },
                        { path: '/report/agent', title: 'Agent', type: 'link' },
                        { path: '/report/super', title: 'Super', type: 'link' },
                        { path: '/report/master', title: 'Master', type: 'link' },
                    ]
                },
                {
                    title: 'Login Reports', type: 'sub', children: [
                        { path: '/report/login/client', title: 'Client', type: 'link' },
                        { path: '/report/login/agent', title: 'Agent', type: 'link' },
                        { path: '/report/login/super', title: 'Super', type: 'link' },
                        { path: '/report/login/master', title: 'Master', type: 'link' },
                    ]
                },
            ],
        },
    ];

    MASTERMENUITEMS: Menu[] = [
        { path: '/super', icon: "home", active: true, title: 'Super Details', type: 'link' },
        { path: '/agent', icon: "home", active: true, title: 'Agent Details', type: 'link' },
        { path: '/client', icon: "home", active: true, title: 'Client Details', type: 'link' },
        {
            title: "Game",
            type: "sub",
            icon: "codepen",
            active: true,
            children: [
            ],
        },
        { path: '/game/inplay-details', title: 'Inplay Games', type: 'sub', icon: 'play' },
        { path: '/game/complete-game', title: 'Complete Games', type: 'sub', icon: 'pause' },
        { path: '/game/cancel-bets', title: 'Cancel Bets', type: 'sub', icon: 'delete' },
        {
            title: "Ledger",
            type: "sub",
            icon: "bookmark",
            active: true,
            children: [
            ],
        },
        { path: '/ledger/my-ledger', title: 'My Ledger', type: 'sub' },
        { path: '/ledger/client/pm', title: 'Client Plus/Minus', type: 'sub' },
        { path: '/ledger/client', title: 'All Client Ledger', type: 'sub' },
        { path: '/ledger/agent', title: 'All Agent Ledger', type: 'sub' },
        { path: '/ledger/super', title: 'All Super Ledger', type: 'sub' },
        {
            title: "Cash Transaction",
            icon: "dollar-sign",
            type: "sub",
            active: true,
            children: [
            ],
        },
        { path: '/cash-transaction/client', title: 'Debit/Credit Entry (C)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/agent', title: 'Debit/Credit Entry (A)', type: 'sub', icon: 'chevrons-right' },
        { path: '/cash-transaction/super', title: 'Debit/Credit Entry (S)', type: 'sub', icon: 'chevrons-right' },
        {
            title: "Reports",
            icon: "clipboard",
            type: "sub",
            active: true,
            children: [
                {
                    title: 'Data Reports', type: 'sub', children: [
                        { path: '/report/client', title: 'Client', type: 'link' },
                        { path: '/report/agent', title: 'Agent', type: 'link' },
                        { path: '/report/super', title: 'Super', type: 'link' },
                    ]
                },
                {
                    title: 'Login Reports', type: 'sub', children: [
                        { path: '/report/login/client', title: 'Client', type: 'link' },
                        { path: '/report/login/agent', title: 'Agent', type: 'link' },
                        { path: '/report/login/super', title: 'Super', type: 'link' },
                    ]
                },
            ],
        },
    ];

    SUPERMENUITEMS: Menu[] = [
        { title: 'Master Detials', type: "sub" },
        { path: '/agent', icon: "home", active: true, title: 'Agent Details', type: 'link' },
        { path: '/client', icon: "home", active: true, title: 'Client Details', type: 'link' },
        {
            title: "Game",
            type: "sub",
            active: true,
            children: [
            ],
        },
        { path: '/game/inplay-details', title: 'Inplay Games', type: 'link', icon: 'play' },
        { path: '/game/complete-game', title: 'Complete Games', type: 'link', icon: 'pause' },
        { path: '/game/cancel-bets', title: 'Cancel Bets', type: 'link', icon: 'delete' },
        {
            title: "Ledger",
            icon: "bookmark",
            type: "sub",
            active: true,
            children: [
                { path: '/ledger/my-ledger', title: 'My Ledger', type: 'link' },
                { path: '/ledger/client/pm', title: 'Client Plus/Minus', type: 'link' },
                { path: '/ledger/client', title: 'All Client Ledger', type: 'link' },
                { path: '/ledger/agent', title: 'All Agent Ledger', type: 'link' },
            ],
        },
        {
            title: "Cash Transaction",
            icon: "dollar-sign",
            type: "sub",
            active: true,
            children: [
                { path: '/cash-transaction/client', title: 'Debit/Credit Entry (C)', type: 'link' },
                { path: '/cash-transaction/agent', title: 'Debit/Credit Entry (A)', type: 'link' },
            ],
        },
        {
            title: "Reports",
            icon: "clipboard",
            type: "sub",
            active: true,
            children: [
                {
                    title: 'Data Reports', type: 'sub', children: [
                        { path: '/report/client', title: 'Client', type: 'link' },
                        { path: '/report/agent', title: 'Agent', type: 'link' },
                    ]
                },
                {
                    title: 'Login Reports', type: 'sub', children: [
                        { path: '/report/login/client', title: 'Client', type: 'link' },
                        { path: '/report/login/agent', title: 'Agent', type: 'link' },
                    ]
                },
            ],
        },
    ];

    PROVIDERMENUITEMS: Menu[] = [
        { path: '/client', icon: "home", active: true, title: 'Client Details', type: 'link' },
        {
            title: "Game",
            type: "sub",
            active: true,
            children: [
                { path: '/game/inplay-details', title: 'Inplay Games', type: 'link', icon: 'play' },
                { path: '/game/complete-game', title: 'Complete Games', type: 'link', icon: 'pause' },
                { path: '/game/cancel-bets', title: 'Cancel Bets', type: 'link', icon: 'delete' },
            ],
        },
        {
            title: "Ledger",
            icon: "bookmark",
            type: "sub",
            active: true,
            children: [
                { path: '/ledger/my-ledger', title: 'My Ledger', type: 'link' },
                { path: '/ledger/client/pm', title: 'Client Plus/Minus', type: 'link' },
            ],
        },
        {
            title: "Cash Transaction",
            icon: "dollar-sign",
            type: "sub",
            active: true,
            children: [
                { path: '/cash-transaction/client', title: 'Debit/Credit Entry (C)', type: 'link' },
            ],
        },
        {
            title: "Reports",
            icon: "clipboard",
            type: "sub",
            active: true,
            children: [
                {
                    title: 'Data Reports', type: 'sub', children: [
                        { path: '/report/client', title: 'Client', type: 'link' },
                        { path: '/report/agent', title: 'Agent', type: 'link' },
                        { path: '/report/super', title: 'Super', type: 'link' },
                        { path: '/report/master', title: 'Master', type: 'link' },
                    ]
                },
                {
                    title: 'Login Reports', type: 'sub', children: [
                        { path: '/report/login/client', title: 'Client', type: 'link' },
                        { path: '/report/login/agent', title: 'Agent', type: 'link' },
                        { path: '/report/login/super', title: 'Super', type: 'link' },
                        { path: '/report/login/master', title: 'Master', type: 'link' },
                    ]
                },
            ],
        },
    ];
}
