package reforged.marcin.krysiak.basketstats.utils;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class SpecificationUtils<T> {

    public  Specification<T> getAndSpec(Specification<T> baseSpec, Specification<T> andSpec) {
        if (Objects.nonNull(baseSpec)) {
            return baseSpec.and(andSpec);
        }
        return andSpec;
    }
}
