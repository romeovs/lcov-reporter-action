import { details, summary, b, fragment, table, tbody, tr, th } from "./html";
import { percentage } from "./lcov";
import { tabulate } from "./tabulate";

/**
 * Github comment for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {{Array<{packageName, lcovBasePath}>}} lcovBaseArrayForMonorepo
 * @param {*} options
 */
export function commentForMonorepo(
    lcovArrayForMonorepo,
    lcovBaseArrayForMonorepo,
    options,
) {
    const html = lcovArrayForMonorepo.map(lcovObj => {
        const baseLcov = lcovBaseArrayForMonorepo.find(
            el => el.packageName === lcovObj.packageName,
        );

        const pbefore = baseLcov ? percentage(baseLcov.lcov) : 0;
        const pafter = baseLcov ? percentage(lcovObj.lcov) : 0;
        const pdiff = pafter - pbefore;
        const plus = pdiff > 0 ? "+" : "";
        const arrow = pdiff === 0 ? "" : pdiff < 0 ? "▾" : "▴";

        const pdiffHtml = baseLcov
            ? th(arrow, " ", plus, pdiff.toFixed(2), "%")
            : "";

        return `${table(
            tbody(
                tr(
                    th(lcovObj.packageName),
                    th(percentage(lcovObj.lcov).toFixed(2), "%"),
                    pdiffHtml,
                ),
            ),
        )} \n\n ${details(
            summary("Coverage Report"),
            tabulate(lcovObj.lcov, options),
        )} <br/>`;
    });

    return fragment(
        `Coverage after merging into ${b(options.base)} <p></p>`,
        html.join(""),
    );
}

/**
 * Github comment for single repo
 * @param {raw lcov} lcov
 * @param {*} options
 */
export function comment(lcov, before, options) {
    const pbefore = before ? percentage(before) : 0;
    const pafter = before ? percentage(lcov) : 0;
    const pdiff = pafter - pbefore;
    const plus = pdiff > 0 ? "+" : "";
    const arrow = pdiff === 0 ? "" : pdiff < 0 ? "▾" : "▴";

    const pdiffHtml = before ? th(arrow, " ", plus, pdiff.toFixed(2), "%") : "";

    return fragment(
        `Coverage after merging ${b(options.head)} into ${b(
            options.base,
        )} <p></p>`,
        table(tbody(tr(th(percentage(lcov).toFixed(2), "%"), pdiffHtml))),
        "\n\n",
        details(summary("Coverage Report"), tabulate(lcov, options)),
    );
}

/**
 * Diff in coverage percentage for single repo
 * @param {raw lcov} lcov
 * @param {raw base lcov} before
 * @param {*} options
 */
export function diff(lcov, before, options) {
    return comment(lcov, before, options);
}

/**
 * Diff in coverage percentage for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {{Array<{packageName, lcovBasePath}>}} lcovBaseArrayForMonorepo
 * @param {*} options
 */
export function diffForMonorepo(
    lcovArrayForMonorepo,
    lcovBaseArrayForMonorepo,
    options,
) {
    return commentForMonorepo(
        lcovArrayForMonorepo,
        lcovBaseArrayForMonorepo,
        options,
    );
}
