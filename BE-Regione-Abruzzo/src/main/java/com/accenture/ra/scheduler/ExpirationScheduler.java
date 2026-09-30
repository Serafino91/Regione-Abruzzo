package com.accenture.ra.scheduler;

import com.accenture.ra.controller.CatalogServicesController;
import com.accenture.ra.repository.DelegatesRepository;
import com.accenture.ra.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExpirationScheduler {
    private final ProjectRepository projectRepository;
    private final DelegatesRepository delegatesRepository;

    @Scheduled(cron = "0 0 2 * * *", zone = "Europe/Rome")
    @Transactional
    public void softDeleteExpiredEntities() {

        LocalDate today = LocalDate.now();

        int expiredProjects =
                projectRepository.softDeleteExpiredProjects(today);

        int expiredDelegationsByProject =
                delegatesRepository.softDeleteDelegationsOfDeletedProjects();

        int expiredDelegations =
                delegatesRepository.softDeleteExpiredDelegations(today);

            log.info(
                "Projects: {}, Delegations by project: {}, Delegations by date: {}",
                expiredProjects,
                expiredDelegationsByProject,
                expiredDelegations
        );
    }
}