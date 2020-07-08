package br.com.celk.repository;

import br.com.celk.domain.UnidadeFederativa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadeFederativaRepository extends JpaRepository<UnidadeFederativa, Long> {

    Page<UnidadeFederativa> findAllByNomeContainsIgnoreCaseOrSiglaContainsIgnoreCase(String nome, String sigla, Pageable pageable);
}
