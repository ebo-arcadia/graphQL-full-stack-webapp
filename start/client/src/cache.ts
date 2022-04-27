import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar
                    }
                },
                cartItems: {
                    read() {
                        return cartItemsVar
                    }
                },
                launches: {
                    keyArgs: false,
                    merge(existing, incoming) {
                        let launches: Reference[] = [];
                        if (existing && existing.launches) {
                            launches = launches.concat(existing.launches)
                        }
                        if (incoming && incoming.launches) {
                            launches = launches.concat(incoming.launches)
                        }
                        return {
                            ...incoming,
                            launches,
                        };
                    }
                }
            }
        }
    }
});

// initialize to true if local storage includes a 'token' key; otherwise, returns false
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

// initialize to an empty array
export const cartItemsVar = makeVar<string[]>([]);
