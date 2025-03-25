export default function autoResetError(error, setError, delay = 500) {
    // Pokud žádná chyba neaktivní, nedělej nic
    if (!error.status) {
        return;
    }

    // Nastav odpočet na resetnutí chyby
    const timer = setTimeout(() => {
        setError(prev => ({ ...prev, status: false }));
    }, delay);

    // Funkce, kterou zavoláme v returnu useEffectu 
    // (zruší timeout při unmountu nebo změně erroru)
    return () => clearTimeout(timer);
}