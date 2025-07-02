import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, l as decodeKey } from './chunks/astro/server_CEUy5rDx.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Jose/Desktop/portfolio/","cacheDir":"file:///C:/Users/Jose/Desktop/portfolio/node_modules/.astro/","outDir":"file:///C:/Users/Jose/Desktop/portfolio/dist/","srcDir":"file:///C:/Users/Jose/Desktop/portfolio/src/","publicDir":"file:///C:/Users/Jose/Desktop/portfolio/public/","buildClientDir":"file:///C:/Users/Jose/Desktop/portfolio/dist/","buildServerDir":"file:///C:/Users/Jose/Desktop/portfolio/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"certificados/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/certificados","isIndex":false,"type":"page","pattern":"^\\/certificados\\/?$","segments":[[{"content":"certificados","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/certificados.astro","pathname":"/certificados","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"proyectos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proyectos","isIndex":false,"type":"page","pattern":"^\\/proyectos\\/?$","segments":[[{"content":"proyectos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyectos.astro","pathname":"/proyectos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"success/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/success","isIndex":false,"type":"page","pattern":"^\\/success\\/?$","segments":[[{"content":"success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/success.astro","pathname":"/success","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":false,"componentMetadata":[["C:/Users/Jose/Desktop/portfolio/src/components/ProjectCard.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/pages/certificados.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/certificados@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/pages/proyectos.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/proyectos@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/pages/proyectos/[id].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/proyectos/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jose/Desktop/portfolio/src/pages/success.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jose/Desktop/portfolio/src/components/HeroProject.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cards-against-humanity.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cards-against-humanity.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:\\Users\\Jose\\Desktop\\portfolio\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cinefan.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cinefan.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cueva-de-ana.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/cueva-de-ana.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/fanpage-cuarteto-de-nos.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/fanpage-cuarteto-de-nos.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/gestor-biblioteca.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/gestor-biblioteca.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/portafolio.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/portafolio.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/raccb.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/raccb.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/sea-battle.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/sea-battle.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/tienda-lacteos.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Jose/Desktop/portfolio/src/content/projects/tienda-lacteos.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/certificados@_@astro":"pages/certificados.astro.mjs","\u0000@astro-page:src/pages/proyectos/[id]@_@astro":"pages/proyectos/_id_.astro.mjs","\u0000@astro-page:src/pages/proyectos@_@astro":"pages/proyectos.astro.mjs","\u0000@astro-page:src/pages/success@_@astro":"pages/success.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C8LWQkig.mjs","C:/Users/Jose/Desktop/portfolio/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:\\Users\\Jose\\Desktop\\portfolio\\.astro\\content-assets.mjs":"chunks/content-assets_BrKjZgka.mjs","C:\\Users\\Jose\\Desktop\\portfolio\\.astro\\content-modules.mjs":"chunks/content-modules_CrGmU_As.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DZs26Auy.mjs","C:/Users/Jose/Desktop/portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_ChRRMG9M.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/fanpage-cuarteto-de-nos.mdx?astroPropagatedAssets":"chunks/fanpage-cuarteto-de-nos_e9O06Vjg.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cueva-de-ana.mdx?astroPropagatedAssets":"chunks/cueva-de-ana_Du6SpDdp.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cards-against-humanity.mdx?astroPropagatedAssets":"chunks/cards-against-humanity_DNuQrHaS.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cinefan.mdx?astroPropagatedAssets":"chunks/cinefan_DSJoHPGp.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/gestor-biblioteca.mdx?astroPropagatedAssets":"chunks/gestor-biblioteca__M5nFEbq.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/raccb.mdx?astroPropagatedAssets":"chunks/raccb_3jCcIUwQ.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/portafolio.mdx?astroPropagatedAssets":"chunks/portafolio_ik6zPzGR.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/sea-battle.mdx?astroPropagatedAssets":"chunks/sea-battle_C1toie7W.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/tienda-lacteos.mdx?astroPropagatedAssets":"chunks/tienda-lacteos_BOhQ9_no.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/fanpage-cuarteto-de-nos.mdx":"chunks/fanpage-cuarteto-de-nos_Cjndkk3D.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cueva-de-ana.mdx":"chunks/cueva-de-ana_qejx_Fz6.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cards-against-humanity.mdx":"chunks/cards-against-humanity_BCQKQ63R.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/cinefan.mdx":"chunks/cinefan_ClRDDra8.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/gestor-biblioteca.mdx":"chunks/gestor-biblioteca_r54UO3Wj.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/raccb.mdx":"chunks/raccb_DUOtD1S0.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/portafolio.mdx":"chunks/portafolio_BJGQvCXn.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/sea-battle.mdx":"chunks/sea-battle_B5UtTzNA.mjs","C:/Users/Jose/Desktop/portfolio/src/content/projects/tienda-lacteos.mdx":"chunks/tienda-lacteos_B1d4ySFv.mjs","C:/Users/Jose/Desktop/portfolio/src/components/CertificateViwer":"_astro/CertificateViwer.CXSUIZXs.js","C:/Users/Jose/Desktop/portfolio/src/components/Header.jsx":"_astro/Header.CNe5Cx3C.js","C:/Users/Jose/Desktop/portfolio/src/components/ProjectComponent.jsx":"_astro/ProjectComponent.DcxiWzij.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","C:/Users/Jose/Desktop/portfolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/josedhernandez-about.DbF68FpP.webp","/_astro/josedhernandez.B-FCVM4C.webp","/_astro/Mathlab-onramp-josedhernandez.CphhMeV3.webp","/_astro/Microsoft-Learn-Python-principiante-josedhernandez.C0khzKBN.webp","/_astro/cisco-conceptos-basicos-redes-josedhernandez.BVX43-nu.webp","/_astro/cisco-introduccion-ciberseguridad-josedhernandez.BCyZvk8n.webp","/_astro/oracle-Database-Desing-josedhernandez.mRPkPxX_.webp","/_astro/oracle-JavaFondations-josedhernandez.DndYEMEv.webp","/_astro/cisco-introduccion-ciencia-datos-josedhernandez.BEXY6k2n.webp","/_astro/dnda-derecho-Industria-Software.ByqDP-Lc.webp","/_astro/oracle-DB-SQL-Learner-josedhernandez.ZW7H7rY9.webp","/_astro/dnda-bascio-derecho-autor.3Bn1nJxY.webp","/_astro/oracle-JavaFundamentals-josedhernandez.CYCIuG_Z.webp","/_astro/platzi-git-github-josedhernandez.D4qcRQOV.webp","/_astro/titulo-tecnico-programacion-sena.DLb8PlqE.webp","/_astro/certificado-english-dot-works-1-sena.DrBGx43G.webp","/_astro/tecnico-profesional-ucompensar-josedhernandez.BnPJ0I7Q.webp","/_astro/telefonica-HabilidadesParaElEmpleado-josedhernandez.kj3yuliq.webp","/_astro/fanpage-cuarteto-de-nos_cover.Br6YmQKP.webp","/_astro/fanpage-cuarteto-de-nos_cover-md.D20iKtlX.webp","/_astro/fanpage-cuarteto-de-nos_cover-xl.U9VqQ653.webp","/_astro/fanpage-cuarteto-de-nos-1.Dbm15nV6.webp","/_astro/cinema-java_cover.CMQnInF-.webp","/_astro/cinema-java_cover-xl.Kaos32V4.webp","/_astro/cinema-java_cover-md.DTPhXwEP.webp","/_astro/cards-against-humanity_cover-md.Ogk_w6hT.webp","/_astro/cinema-java-4.CtoX7y3k.webp","/_astro/cards-against-humanity_cover.BZux1-y0.webp","/_astro/cards-against-humanity-9.B9GdE60q.webp","/_astro/cards-against-humanity_cover-xl.C7gH0g9B.webp","/_astro/cinefan_cover.RReo_Ke6.webp","/_astro/cinefan_cover-md.bcO4Fhc5.webp","/_astro/cinefan_cover-xl.Dcd8Fnl1.webp","/_astro/cinefan.1Zt2uzer.webp","/_astro/libreria-java_cover-xl.DsCkbpZB.webp","/_astro/libreria-java_cover.DH2J30q-.webp","/_astro/raccb_cover.DNaHP18A.webp","/_astro/libreria-java_cover-md.D7ijcbKX.webp","/_astro/libreria-java-4.CXW1SZ4F.webp","/_astro/raccb_cover-xl.CVmU52pH.webp","/_astro/raccb_cover-md.DFW_mnWd.webp","/_astro/raccb.BrHAQ4PT.webp","/_astro/portfolio_cover.DpjpjILb.webp","/_astro/portfolio_cover-md.CMgOH_ym.webp","/_astro/portfolio_cover-xl.CzUGRhZI.webp","/_astro/sea-battle_cover-xl.CecPvs8Y.webp","/_astro/sea-battle_cover-md.CZYgavC7.webp","/_astro/portfolio.9D9n_5_r.webp","/_astro/sea-battle-6.6I_UwJNC.webp","/_astro/sea-battle_cover.6NuX3wrE.webp","/_astro/tienda-lacteos_cover.D4mhSckJ.webp","/_astro/tienda-lacteos_cover-md.Dj8Uy8NY.webp","/_astro/tienda-lacteos-4.CXQ5iIEV.webp","/_astro/tienda-lacteos_cover-xl.B6kbPD5-.webp","/_astro/logo_sena.D42hga-B.webp","/_astro/logo-ucompensar.Bvat6H9m.webp","/_astro/raccb-2.Cp-1wm-V.webp","/_astro/raccb-1.CZ6z7Vid.webp","/_astro/raccb-3.EXAjQtUP.webp","/_astro/raccb-4.k6BurjQU.webp","/_astro/raccb-5.Bxy6Be8z.webp","/_astro/raccb-6.LjtdssHT.webp","/_astro/raccb-7.Bbl1_P0v.webp","/_astro/raccb-10.D-yxjz_D.webp","/_astro/raccb-9.iknZmJpj.webp","/_astro/raccb-8.CLCrDArm.webp","/_astro/raccb-12.DthvXejB.webp","/_astro/raccb-11.Dn2ESKg7.webp","/_astro/raccb-13.BgFsb1Nf.webp","/_astro/raccb-14.BwuhCcos.webp","/_astro/raccb-15.DSKJfJIh.webp","/_astro/raccb-16.CnhQt86W.webp","/_astro/raccb-17.Bj7u9jik.webp","/_astro/raccb-18.CxWbBXMP.webp","/_astro/raccb-19.C4SJr4Gl.webp","/_astro/raccb-20.Bl0RveCc.webp","/_astro/portfolio-1.DHob-VCs.webp","/_astro/portfolio-3.DXuFarCZ.webp","/_astro/portfolio-2.DdV6BJ-o.webp","/_astro/portfolio-4.DKkBZNuF.webp","/_astro/portfolio-5.BkFqTCnr.webp","/_astro/portfolio-6.kmXYxb4m.webp","/_astro/portfolio-7.Dp2gckGO.webp","/_astro/portfolio-8.C9005HmF.webp","/_astro/portfolio-9.DLH5sQ2d.webp","/_astro/fanpage-cuarteto-de-nos-2.CqLTdosG.webp","/_astro/fanpage-cuarteto-de-nos.CXTy0L69.webp","/_astro/fanpage-cuarteto-de-nos-3.C1NN_Pw7.webp","/_astro/fan-page-4teto.IOqLojXm.webp","/_astro/fanpage-cuarteto-de-nos-4.D-oTXtz0.webp","/_astro/fan-page-4teto-2._DHHoojD.webp","/_astro/fan-page-4teto-1.9R_lCCqn.webp","/_astro/fan-page-4teto-3.D1iG9HKq.webp","/_astro/fan-page-4teto-4.sZ-scRYW.webp","/_astro/fan-page-4teto-5.twkU_n4D.webp","/_astro/cinema-java.gIGmg6nv.webp","/_astro/cinema-java-1.DidFdJXI.webp","/_astro/cinema-java-2.D_N1nnNK.webp","/_astro/cinema-java-3.DNoyMWMk.webp","/_astro/cinema-java-6.DYWGbSdN.webp","/_astro/cinema-java-5.CJnNn6NO.webp","/_astro/cinema-java-7.DO7mn2tb.webp","/_astro/libreria-java.LmHe9IV4.webp","/_astro/libreria-java-1.WJaE60QJ.webp","/_astro/libreria-java-2.CO_Ve0ux.webp","/_astro/libreria-java-3.BQqYNb3i.webp","/_astro/libreria-java-5.BLjQbavz.webp","/_astro/sea-battle.ChAaszE8.webp","/_astro/libreria-java-6.BEf97xxT.webp","/_astro/sea-battle-1.Bckkosyv.webp","/_astro/sea-battle-2.ea1ghJKL.webp","/_astro/sea-battle-3.DNwyf3XG.webp","/_astro/sea-battle-4.5YQi0GxR.webp","/_astro/sea-battle-5.lD4N01sx.webp","/_astro/cinefan-1.Dt918dwU.webp","/_astro/cinefan-2.BhFqZ723.webp","/_astro/cinefan-3.B0f_cbG2.webp","/_astro/cinefan-4.CnASFXeQ.webp","/_astro/cinefan-6.DVZ8Qkv6.webp","/_astro/cinefan-5.DtNLqWS0.webp","/_astro/cinefan-7.B6w5n1UH.webp","/_astro/tienda-lacteos.CtvguZaM.webp","/_astro/tienda-lacteos-3.tpyDUXhw.webp","/_astro/tienda-lacteos-1.Bi-EoPeW.webp","/_astro/tienda-lacteos-2.d5wz3ca3.webp","/_astro/tienda-lacteos-5.Dqw5M04p.webp","/_astro/tienda-lacteos-7.DlyXoSYt.webp","/_astro/tienda-lacteos-6.FmSJIcOc.webp","/_astro/tienda-lacteos-8.CAp1uLoJ.webp","/_astro/tienda-lacteos-9.F2fuE2mq.webp","/_astro/tienda-lacteos-10.BW226Kb4.webp","/_astro/close.Cp7eg8fP.svg","/_astro/menu.BhrV0l2Z.svg","/_astro/external-page.NoeS514u.svg","/_astro/download.QFusLgeO.svg","/_astro/cards-against-humanity.Cl_nxjUB.webp","/_astro/cards-against-humanity-2.CkejQECu.webp","/_astro/cards-against-humanity-1.XEFVNPim.webp","/_astro/cards-against-humanity-4.BHtvYqu1.webp","/_astro/cards-against-humanity-6.oEhIrNB1.webp","/_astro/cards-against-humanity-5.Rlk-Im65.webp","/_astro/cards-against-humanity-7.BHWMhGi3.webp","/_astro/cards-against-humanity-8.BJl4OqWh.webp","/_astro/cards-against-humanity-10.Dl-YvTIQ.webp","/_astro/cards-against-humanity-11.CNyWFv6M.webp","/_astro/cards-against-humanity-12.yVEkR0Z0.webp","/_astro/cc.B9jsV3GR.svg","/_astro/by.vgjEzI54.svg","/_astro/nc.chksEyqz.svg","/_astro/nd.K2rSvmgA.svg","/_astro/sa.C038DsNI.svg","/_astro/certificados.CwY_WOUV.css","/CV-Jose-hernandez.pdf","/favicon.svg","/Certificados/certificado-english-dot-works-1-sena.pdf","/Certificados/cisco-conceptos-basicos-redes-josedhernandez.pdf","/Certificados/cisco-introduccion-ciberseguridad-josedhernandez.pdf","/Certificados/cisco-introduccion-ciencia-datos-josedhernandez.pdf","/Certificados/dnda-bascio-derecho-autor.pdf","/Certificados/dnda-derecho-Industria-Software.pdf","/Certificados/Mathlab-onramp-josedhernandez.pdf","/Certificados/Microsoft-Learn-Python-principiante-josedhernandez.pdf","/Certificados/oracle-Database-Desing-josedhernandez.pdf","/Certificados/oracle-DB-SQL-Learner-josedhernandez.pdf","/Certificados/oracle-JavaFondations-josedhernandez.pdf","/Certificados/oracle-JavaFundamentals-josedhernandez.pdf","/Certificados/platzi-git-github-josedhernandez.pdf","/Certificados/tecnico-profesional-ucompensar-josedhernandez.pdf","/Certificados/telefonica-HabilidadesParaElEmpleado-josedhernandez.pdf","/Certificados/titulo-tecnico-programacion-sena.pdf","/fonts/OpenSans-Bold.ttf","/fonts/OpenSans-BoldItalic.ttf","/fonts/OpenSans-Italic.ttf","/fonts/OpenSans-Light.ttf","/fonts/OpenSans-Medium.ttf","/fonts/OpenSans-Regular.ttf","/fonts/OpenSans-SemiBold.ttf","/fonts/Poppins-Bold.ttf","/fonts/Poppins-Medium.ttf","/Images/default-og.jpg","/_astro/Astro.DKxQDVnt.svg","/_astro/Bootstrap.BjsrYQ8g.svg","/_astro/certificados.Dr-kECj9.css","/_astro/certificados.DRDMho4j.css","/_astro/CertificateViwer.CXSUIZXs.js","/_astro/client.BPIbHqJh.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/close.CM-LaDO3.js","/_astro/Css.Bo-ZiTOp.svg","/_astro/Express.BAv70uvy.svg","/_astro/Figma.DUCIAJUb.svg","/_astro/filter.CeADV7xH.svg","/_astro/Git.-uL_MSsx.svg","/_astro/Github.fKA40jId.svg","/_astro/Header.CNe5Cx3C.js","/_astro/Html.CEvtVX9f.svg","/_astro/index.BVOCwoKb.js","/_astro/Java.9CqN-MwP.svg","/_astro/Javascript.CMZA3KZQ.svg","/_astro/Markdown.BkF8Iajl.svg","/_astro/Mongodb.DMmPPGT9.svg","/_astro/Mysql.4swb_9Mw.svg","/_astro/Nodejs.Blcg8PPy.svg","/_astro/Penpot.DAwW0MEp.svg","/_astro/Php.CjLVmgna.svg","/_astro/ProjectComponent.DcxiWzij.js","/_astro/React.DjX8JFD8.svg","/_astro/Sass.AEyTHHPt.svg","/_astro/search.hd9Wq9o6.svg","/_astro/Socketio.BFXHQHEk.svg","/_astro/Tailwind.C932tjow.svg","/404.html","/certificados/index.html","/proyectos/index.html","/success/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6RUuxmblE5WBcl1gSsQdqyROAqMcyKZsT23u1U6prew=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\Jose\\Desktop\\portfolio\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
