package br.com.celk.service;

import br.com.celk.domain.UnidadeFederativa;
import br.com.celk.repository.UnidadeFederativaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UnidadeFederativaService implements Serializable {
    private final UnidadeFederativaRepository repository;

    public UnidadeFederativaService(UnidadeFederativaRepository repository) {
        this.repository = repository;
    }

    public Page<UnidadeFederativa> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public UnidadeFederativa findById(Long id) {
        return repository.findById(id).orElse(new UnidadeFederativa());
    }

    public UnidadeFederativa save(UnidadeFederativa entity) {
        entity.setDataAtualizacao(LocalDateTime.now());
        return repository.save(entity);
    }

    public void delete(Long id) {
        Optional<UnidadeFederativa> entity = repository.findById(id);
        entity.ifPresent(repository::delete);
    }

    public Page<UnidadeFederativa> listAllByFiltro(String search, Pageable pageable) {
        return repository.findAllByNomeContainsIgnoreCaseOrSiglaContainsIgnoreCase(search, search, pageable);
    }
}
