'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") {
            setIsLoading(true);
            return;
        }

        setIsLoading(false);
        
        if (session?.user?.IdMenu) {
            const idMenuArray = session.user.IdMenu.split(','); // Convierte la cadena en un array
            if (!idMenuArray.some(id => id.trim() === '1')) {
               // router.push('/');
            }
        } else if (status === "authenticated" && !session?.user?.IdMenu) {
            // Redirige si no hay IdMenu definido después de autenticarse
            //router.push('/');
        }
    }, [session, status, router]);

    if (isLoading) {
        return <div>Cargando...</div>; // O cualquier componente de carga
    }

    return (
        <>
        <div className='px-10'>
        {children}
        </div>
       
        </>
    );
}
