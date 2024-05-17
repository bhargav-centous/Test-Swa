import { _mock } from "src/_mock";

export const linkedRequest = [
    {
        title: 'Woolworths',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        email: 'john.doe@gmail.com',
        imageURL: 'woolworths',
        type: 'linked',
        btnText: 'Unlink',
        id: _mock.id(0)
    },
    {
        title: 'Telstra',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        email: 'john.doe@gmail.com',
        type: 'linked',
        imageURL: 'telstra',
        btnText: 'Unlink',
        id: _mock.id(1)
    },
]
export const pendingRequest = [
    {
        title: 'Westpac',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        type: 'pending',
        email: 'john.doe@gmail.com',
        imageURL: 'westpac',
        btnText: 'Accept',
        secondarybtnText: 'Ignore',
        id: _mock.id(0)
    },
    {
        title: 'Paris Creek',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        type: 'pending',
        email: 'john.doe@gmail.com',
        imageURL: 'parisCreek',
        btnText: 'Accept',
        secondarybtnText: 'Ignore',
        id: _mock.id(1)
    },
]

export const linkRequest = [
    {
        title: 'Westpac',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        type: 'link',
        email: 'john.doe@gmail.com',
        imageURL: 'westpac',
        btnText: 'Connect',
        btnIcon: 'add-user',
        secondarybtnText: 'Ignore',
        id: _mock.id(0)
    },
    {
        title: 'Paris Creek',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        type: 'link',
        email: 'john.doe@gmail.com',
        imageURL: 'parisCreek',
        btnIcon: 'add-user',
        btnText: 'Connect',
        secondarybtnText: 'Ignore',
        id: _mock.id(1)
    },
    {
        title: 'Salvation Army',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        email: 'john.doe@gmail.com',
        type: 'link',
        imageURL: 'telstra',
        btnIcon: 'add-user',
        btnText: 'Connect',
        id: _mock.id(2)
    },
    {
        title: 'Plan',
        rating: '5',
        organizationRegistrationNumber: '78925486458',
        membershipNumber: '354624',
        contactno: '+61-455-513-290',
        email: 'john.doe@gmail.com',
        type: 'link',
        imageURL: 'woolworths',
        btnIcon: 'add-user',
        btnText: 'Connect',
        id: _mock.id(3)
    },
]

export const selectedBrandyOptions = [
    {
        label: 'Westpac', value: 'Westpac',
    },
    {
        label: 'Paris Creek', value: 'Paris Creek',
    },
    {
        label: 'Salvation Army', value: 'Salvation Army',
    },
    {
        label: 'Plan', value: 'Plan',
    },
]

export const countryOptions = [
    { label: 'India', value: 'india' },
    { label: 'Canada', value: 'canada' },
    { label: 'America', value: 'america' },
]

export const brandCategoryOptions = [
    { label: 'Brand 1', value: 'brand-1' },
    { label: 'Brand 2', value: 'brand-2' },
    { label: 'Brand 3', value: 'brand-3' }
]