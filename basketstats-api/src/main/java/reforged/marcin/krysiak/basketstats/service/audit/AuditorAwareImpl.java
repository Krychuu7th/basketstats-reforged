package reforged.marcin.krysiak.basketstats.service.audit;

import io.micrometer.common.lang.NonNullApi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import reforged.marcin.krysiak.basketstats.providers.UserProvider;

import java.util.Optional;

@RequiredArgsConstructor
@NonNullApi
public class AuditorAwareImpl implements AuditorAware<String> {

    private final UserProvider userProvider;

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of(this.userProvider.getUserEmail());
    }
}
